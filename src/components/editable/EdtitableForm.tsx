import * as React from "react";
import {Steps, Button,  Card, Row, Col} from "antd";
import {IPage, IField, IFormProps} from "@adinfinity/ai-core-forms";
import EditablePageComponent from "./EditablePage";
import {Formik, withFormik} from "formik";
import {FormStateHelper} from "../../helpers/FormStateHelper";

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export class FormComponent extends React.Component<any, any> {
    evaluators: any = {};
    validateForm = () => {};
    values: any = {};

    getFieldValue(id) {
        console.log("getFieldValue", id, this);
        return this.values[id];
    }

    constructor(props: any) {
        super(props);
        let {formData} = props;
        this.getFieldValue = this.getFieldValue.bind(this)
        this.state = FormStateHelper.getInitialState(formData, this.evaluators, {getFieldValue: this.getFieldValue});
        console.log(this.state.validationSchema)
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
        this.setState({ currentPage });
    }

    onChange(id: string, value: any) {
        let self = this;
        // console.log("onChange", id, value);
        this.values[id] = value;
        setTimeout(() => {
            let deps = self.state.dependencies[id] || [];
            deps.forEach((d) => {
                let state = Object.assign({}, self.state)
                state.conditionals[d].result =  self.evaluators[d].value(this.getFieldValue)
                self.setState(state);
            });
        }, 0);
        return;
    }

    onSubmit = (values: any, actions: any) => {
        console.log("handleSubmit", values);
        let self = this;

        setTimeout(()=> {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
        }, 200);
    }



    render() {
        let {formData} = this.props;
        // console.log("validation", this.state.validationSchema);
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
                    <Formik onSubmit={this.onSubmit}
                            initialValues={this.state.values}
                            validationSchema={this.state.validationSchema}
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

                        <form onSubmit={(values) => this.onSubmit(values, errors)}>
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