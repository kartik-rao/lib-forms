import * as React from "react";
import {Steps, Button,  Card, Row, Col} from "antd";
import {IPage } from "@adinfinity/ai-core-forms";
import EditablePageComponent from "./EditablePage";
import {Formik} from "formik";
import {FormStateHelper} from "../../helpers/FormStateHelper";
import {Logger} from "@adinfinity/ai-lib-logging";
const { buildYup } = require("json-schema-to-yup");
import Yup from "yup";

const logger: Logger = Logger.getInstance(["ai-lib-forms", "EditableForm"], Logger.severity.debug);

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export class FormComponent extends React.Component<any, any> {
    evaluators: any = {};
    values: any = {};
    touched: any = {};
    logger: Logger;
    setFieldError: any;

    getFieldValue(id) {
        return this.values[id];
    }

    constructor(props: any) {
        super(props);
        let {formData} = props;
        this.getFieldValue = this.getFieldValue.bind(this)
        this.state = FormStateHelper.getInitialState(formData, this.evaluators, {getFieldValue: this.getFieldValue});
    }

    next() {
        let self = this;
        const {currentPage, fieldMeta} = this.state;
        if (!this.props.formData.formLayoutOptions.validationDisablesPaging) {
            this.setState({ currentPage: currentPage + 1 });
            return;
        }

        let _errors = this.validate(this.values, fieldMeta.pageFields[currentPage].ids);
        let errorOnThisPage = Object.keys(_errors).length > 0;

        if (!errorOnThisPage) {
            self.setState({ currentPage: currentPage + 1 });
        }
        return;
    }

    prev() {
        logger.debug("prevPage");
        const currentPage = this.state.currentPage - 1;
        this.setState({ currentPage: currentPage });
    }

    onChange(id: string, value: any) {
        let self = this;
        logger.debug("onChange", id, value);
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
        this.logger.info("handleSubmit", values);
        // Handle dates here
        setTimeout(()=> {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
        }, 200);
    }

    // Custom yup validation with context
    validate = (values:any, includeFields:any[]=[]) => {
        let {currentPage, fieldMeta, validationSchema} = this.state;
        const context = {};

        if (!includeFields || includeFields.length == 0) {
            includeFields = fieldMeta.pageFields[currentPage].idsfieldMeta.pageFields[currentPage].ids
        }
        // Have to deep copy otherwise
        let vFields: any = JSON.parse(JSON.stringify(validationSchema.properties));

        let{ conditionals} = this.state;
        let self = this;

        // Disable validation for conditional fields
        Object.keys(conditionals).forEach((fid) => {
            const isValidateable = typeof vFields[fid] !== 'undefined' && includeFields.indexOf(fid) > -1;
            const isFieldEnabled = self.evaluators[fid] ? self.evaluators[fid].value(self.getFieldValue) : true;
            if(isValidateable && !isFieldEnabled) {
                vFields[fid].required = false;
            }
        });

        const validator: Yup.ObjectSchema<any> = buildYup({type:"object",  properties: vFields, errMessages:validationSchema.errMessages});

        try {
            validator.validateSync(values, { abortEarly: false, context })
            return {};
        } catch (error) {
            let errors = {};
            error.inner.forEach((e)=>{
                errors[e.path] = e.message;
                self.setFieldError(e.path, e.message);
            });
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
                            setFieldError,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting
                    }) => (
                        <form onSubmit={handleSubmit}>
                            {
                            formData.content.pages.map((page: IPage, pn: number) => {
                                self.setFieldError = setFieldError;
                                let {currentPage} = this.state;
                                let {formLayoutOptions} = this.props.formData;
                                let eventHooks = () => {
                                    return {
                                        onChange: (name, value) => {
                                            setFieldValue(name, value);
                                            handleChange(name);
                                            this.onChange(name, value);
                                        },
                                        onBlur : (name) => {
                                            self.touched[name] = true;
                                            setFieldTouched(name);
                                            handleBlur(name);
                                        },
                                        setFieldValue: setFieldValue,
                                        setFieldTouched: setFieldTouched,
                                        setFieldError: setFieldError
                                    }
                                }
                                return <div className="page-wrapper" key={pn} style={{'visibility': currentPage == pn ? 'visible': 'hidden', display: currentPage == pn ? 'block': 'none'}}>
                                    <EditablePageComponent
                                        index={pn}
                                        page={page}
                                        errors={errors}
                                        touched={touched}
                                        values={values}
                                        formLayout={formLayoutOptions}
                                        conditionals={this.state.conditionals}
                                        eventHooks={eventHooks}></EditablePageComponent>
                                </div>
                                })
                            }
                        <div className="page-actions">
                            <Card>
                                <Row>
                                    <Col span={24} style={{ textAlign: 'right' }}>
                                        <Button disabled={Object.keys(touched).length == 0 || hasErrors(errors) || isSubmitting} type="primary" style={{ marginLeft: 8 }} htmlType="submit" className="action-button">Submit</Button>
                                        { this.state.currentPage < this.state.numPages -1 && <Button type="primary" style={{ marginLeft: 8 }} className="action-button" onClick={() => this.next()}>Next</Button> }
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