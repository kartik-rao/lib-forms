import * as React from "react";
import {Steps, Button,  Card, Row, Col} from "antd";
import {IPage } from "@adinfinity/ai-core-forms";
import EditablePageComponent from "./EditablePage";
import {Formik} from "formik";
import {Logger} from "@adinfinity/ai-lib-logging";
import {FieldPropertiesComponent} from "./FieldProperties";
import { observer } from "mobx-react";


const logger: Logger = Logger.getInstance(["ai-lib-forms", "EditableForm"], Logger.severity.debug);

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@observer
export class FormComponent extends React.Component<any, any> {

    logger: Logger;
    setFieldError: any;

    constructor(props: any) {
        super(props);
        // let {formData} = props;
        // this.getFieldValue = this.getFieldValue.bind(this)
        // store = {selectedField:null, ...FormStateHelper.getInitialState(formData, this.evaluators, {getFieldValue: this.getFieldValue})};
    }

    render() {
        const {store} = this.props;
        let {formData} = store;
        let self = this;

        return (<div className="form-wrapper">
            {formData.content.title &&
               <Row>
                   <Col span={20}>
                        <Card><h2>{formData.content.title}</h2><br/><h3>{formData.content.subtitle}</h3></Card>
                    </Col>
                </Row>
            }
            {formData.formLayoutOptions.showSteps && <Row>
                <Col span={20}>
                    <Card>
                        <Steps size="small" current={store.currentPage}>
                            {formData.content.pages.map((page: IPage, pn: number) => {
                                return <Steps.Step title={page.title} key={pn}/>
                            })}
                        </Steps>
                    </Card>
                </Col>
            </Row>}
            <Row>
                <Col span={20}>
                    <Formik onSubmit={store.onSubmit}
                            initialValues={store.values}
                            validate={store.validate}
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
                                let {currentPage} = store;
                                let {formLayoutOptions} = this.props.formData;
                                let eventHooks = () => {
                                    return {
                                        onChange: (name, value) => {
                                            setFieldValue(name, value);
                                            handleChange(name);
                                            store.onChange(name, value);
                                        },
                                        onBlur : (name) => {
                                            store.touched[name] = true;
                                            setFieldTouched(name);
                                            store.handleBlur(name);
                                        },
                                        selectField: store.selectField,
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
                                        conditionals={store.conditionals}
                                        eventHooks={eventHooks}></EditablePageComponent>
                                </div>
                                })
                            }
                        <div className="page-actions">
                            <Card>
                                <Row>
                                    <Col span={24} style={{ textAlign: 'right' }}>
                                        { store.currentPage == store.numPages -1 && <Button disabled={Object.keys(touched).length == 0 || hasErrors(errors) || isSubmitting } type="primary" style={{ marginLeft: 8 }} htmlType="submit" className="action-button">Submit</Button>}
                                        { store.currentPage < store.numPages -1 && <Button type="primary" style={{ marginLeft: 8 }} className="action-button" onClick={() => store.next()}>Next</Button> }
                                        { store.currentPage > 0 && store.numPages > 1 && <Button type="primary" className="action-button" onClick={() => store.prev()}>Prev</Button> }
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
                <Col span={4}>
                    {store.selectedField && <FieldPropertiesComponent field={store.selectedField}/>}
                </Col>
            </Row>
        </div>
        )
    }
}

export default FormComponent;