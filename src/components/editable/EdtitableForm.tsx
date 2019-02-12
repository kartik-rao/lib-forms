import {FormComponent} from "../Form";
import React from "react";
import {Steps, Form, Button,  Card, Row, Col} from "antd";
import {IPage } from "@adinfinity/ai-core-forms";
import EditablePageComponent from "./EditablePage";

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class EditableFormComponent extends FormComponent {
    render() {
        let {formData} = this.props;
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
                    <Form onSubmit={this.handleSubmit} layout={this.props.layout} >
                        {
                            formData.content.pages.map((page: IPage, pn: number) => {
                                let {currentPage} = this.state;
                                let {formLayoutOptions} = this.props.formData;
                                return <div className="page-wrapper" key={pn} style={{'visibility': currentPage == pn ? 'visible': 'hidden', display: currentPage == pn ? 'block': 'none'}}>
                                    <EditablePageComponent page={page} conditionals={this.state.conditionals} index={pn} formLayout={formLayoutOptions} decorators={this.props.form} eventHooks={this.eventHooks}></EditablePageComponent>
                                </div>
                            })
                        }
                        <div className="page-actions">
                            <Card>
                                <Row>
                                    <Col span={24} style={{ textAlign: 'right' }}>
                                        { <Form.Item>
                                            <Button disabled={hasErrors(this.props.form.getFieldsError())} type="primary" style={{ marginLeft: 8 }} htmlType="submit" className="action-button">Submit</Button>
                                            { this.state.currentPage < this.state.numPages -1 && <Button type="primary"  style={{ marginLeft: 8 }} className="action-button" onClick={() => this.next()}>Next</Button> }
                                            { this.state.currentPage > 0 && this.state.numPages > 1 && <Button type="primary" className="action-button" onClick={() => this.prev()}>Prev</Button> }
                                        </Form.Item> }
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
        )
    }
}

export default Form.create()(EditableFormComponent);