import * as React from "react";
import {Steps, Button,  Card, Row, Col} from "antd";
import {IPage, IField, IFormProps} from "@adinfinity/ai-core-forms";
import EditablePageComponent from "./EditablePage";
import {Formik, yupToFormErrors, FormikErrors} from "formik";
import {FormStateHelper} from "../../helpers/FormStateHelper";
const { buildYup } = require("json-schema-to-yup");
import Yup from "yup";

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export class FormComponent extends React.Component<any, any> {
    evaluators: any = {};
    values: any = {};
    touched: any = {};

    getFieldValue(id) {
        return this.values[id];
    }

    constructor(props: any) {
        super(props);
        let {formData} = props;
        this.getFieldValue = this.getFieldValue.bind(this)
        this.state = FormStateHelper.getInitialState(formData, this.evaluators, {getFieldValue: this.getFieldValue});
    }

    next(errors: any, touched: any, values:any, validationSchema: any) {
        let self = this;
        const currentPage = this.state.currentPage;
        if (!this.props.formData.formLayoutOptions.validationDisablesPaging) {
            this.setState({ currentPage: currentPage + 1 });
            return;
        }

        let errorOnThisPage = false;
        console.log("Fields on this page", self.state.fieldMeta.pageFields[currentPage].names);
        Object.keys(errors).forEach(e => {
            if (self.state.fieldMeta.pageFields[currentPage].names.indexOf(e) > -1) {
                console.log("Testing", e);
                errorOnThisPage = true
            }
        });
        console.log("errorOnThisPage", errorOnThisPage, errors);
        if (Object.keys(touched).length > 0 && !errorOnThisPage) {
            self.setState({ currentPage: currentPage + 1 });
        }
        return;
    }

    prev() {
        console.log("prevPage");
        const currentPage = this.state.currentPage - 1;
        this.setState({ currentPage: currentPage });
    }

    onChange(id: string, value: any) {
        let self = this;
        // console.log("onChange", id, value);
        this.values[id] = value;

        let deps = self.state.dependencies[id] || [];
        let newState = Object.assign({}, self.state);
        deps.forEach((d) => {
            newState.conditionals[d].result =  self.evaluators[d].value(self.getFieldValue)
        });
        self.setState(newState);

        return;
    }

    onBlur(id: string) {
        this.touched[id] = true;
    }

    onSubmit = (values: any, actions: any) => {
        console.log("handleSubmit", values);
        // Handle dates here
        setTimeout(()=> {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
        }, 200);
    }


    // Custom yup validation with context
    validate = (values) => {
        const context = {};
        // Have to deep copy otherwise
        let fields = JSON.parse(JSON.stringify(this.state.validationSchema.properties));
        let{ conditionals} = this.state;
        let self = this;

        console.log("Validating fields", fields, conditionals);

        // Disable validation for conditional fields
        Object.keys(this.state.conditionals).forEach((fid) => {
            const isValidateable = typeof fields[fid] !== 'undefined';
            const isFieldEnabled = self.evaluators[fid] ? self.evaluators[fid].value(self.getFieldValue) : true;
            const isFieldRequired = isValidateable ? fields[fid].required == true : false;
            if (fid == "f3") {
                console.log(`${fid} - ${JSON.stringify(fields[fid])}- validateable=${isValidateable} enabled=${isFieldEnabled} required=${isFieldRequired}`);
            }
            if(isValidateable && isFieldRequired) {
                fields[fid].required = isFieldEnabled;
            }
        });

        const validator: Yup.ObjectSchema<any> = buildYup({type:"object",  properties: fields, errMessages:this.state.validationSchema.errMessages});

        try {
            validator.validateSync(values, { abortEarly: false, context })
            return {};
        } catch (error) {
            let errors = {};
            error.inner.forEach((e)=>{
                errors[e.path] = e.message;
            });
            // console.log("validation errors exist", errors)
            return errors;
        }
    }

    render() {
        let {formData} = this.props;
        let self = this;

        return (<div className="form-wrapper">
            {formData.content.title &&
                <Card><h2>{formData.content.title}</h2><br/><h3>{formData.content.subtitle}</h3></Card>
            }
            {formData.formLayoutOptions.showSteps && <Row>
                <Col span={24}>
                    <Card>
                        <Steps size="small" current={this.state.currentPage}>
                            {formData.content.pages.map((page: IPage, pn: number) => {
                                return <Steps.Step title={page.title} key={pn}/>
                            })}
                        </Steps>
                    </Card>
                </Col>
            </Row>}
            <Row>
                <Col span={24}>
                    <Formik onSubmit={self.onSubmit}
                            initialValues={this.state.values}
                            validate={this.validate}
                            validateOnBlur={true}
                            validateOnChange={true} render={({
                            values,
                            errors,
                            status,
                            touched,
                            setFieldValue,
                            setFieldTouched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting
                    }) => (

                        <form onSubmit={handleSubmit}>
                            {
                            formData.content.pages.map((page: IPage, pn: number) => {
                                let {currentPage} = this.state;
                                let {formLayoutOptions} = this.props.formData;
                                let eventHooks = () => {
                                    return {
                                        onChange: (name, value) => {
                                            setFieldValue(name, value);
                                            handleChange(name);
                                            setTimeout(() => {this.onChange(name, value);})
                                        },
                                        onBlur : (name) => {
                                            self.touched[name] = true;
                                            setFieldTouched(name);
                                            handleBlur(name);
                                        },
                                        setFieldValue: setFieldValue,
                                        setFieldTouched: setFieldTouched
                                    }
                                }
                                return <div className="page-wrapper" key={pn} style={{'visibility': currentPage == pn ? 'visible': 'hidden', display: currentPage == pn ? 'block': 'none'}}>
                                    <EditablePageComponent page={page} errors={errors} touched={touched} conditionals={this.state.conditionals} index={pn} formLayout={formLayoutOptions} values={values} eventHooks={eventHooks}></EditablePageComponent>
                                </div>
                                })
                            }
                        <div className="page-actions">
                            <Card>
                                <Row>
                                    <Col span={24} style={{ textAlign: 'right' }}>
                                        <Button disabled={Object.keys(touched).length == 0 || hasErrors(errors) || isSubmitting} type="primary" style={{ marginLeft: 8 }} htmlType="submit" className="action-button">Submit</Button>
                                        { this.state.currentPage < this.state.numPages -1 && <Button type="primary" style={{ marginLeft: 8 }} className="action-button" onClick={() => this.next(errors, touched, values, this.state.validationSchema)}>Next</Button> }
                                        { this.state.currentPage > 0 && this.state.numPages > 1 && <Button type="primary" className="action-button" onClick={() => this.prev()}>Prev</Button> }
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                        <div>Errors<br/>{JSON.stringify(errors)}</div>
                        <div>Touched<br/>{JSON.stringify(touched)}</div>
                        <div>Values<br/>{JSON.stringify(values)}</div>
                        <div>Status<br/>{JSON.stringify(status)}</div>
                    </form>
                    )}>
                    </Formik>
                </Col>
            </Row>
        </div>
        )
    }
}

export default FormComponent;