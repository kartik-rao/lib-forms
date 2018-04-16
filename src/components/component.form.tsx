import * as React from "react";
import * as ReactDOM from "react-dom";

import {Form, Button, Input, Select, Radio, DatePicker, InputNumber, Card, Pagination, Row, Col} from "antd";
import {IFormProps} from "../models/model.form";

import {Page} from "../models/model.page";
import {Field} from "../models/model.field";
import {Section} from "../models/model.section";

class FormComponent extends React.Component<IFormProps, any> {
    constructor(props: IFormProps) {
        super(props);
    }

    state = {
        confirmDirty: false
    };

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    renderSection(section: Section, sn: number) {
        const numFields = section.fields.length;
        return <Card key={sn} title={section.name}>
            { section.fields.map((field: Field, fn: number) => {
                const fieldType = field.type;
                const config = {
                    valuePropName: field.name,
                    rules: [{ required: true, message: field.helpText }],
                };
                const rangeConfig = {
                    valuePropName: field.name,
                    rules: [{ required: true, message: field.helpText }],
                };
                return this.renderField(field, fn);
            })}
        </Card>
    }

    renderField(field: Field, fn: number) {
        const fieldType = field.type;
        const {getFieldDecorator} = this.props.form;

        return <Form.Item label={field.showLabel ? field.label:''} key={fn} required={false} {...this.props.formItemLayout}>
            {fieldType == "input" && getFieldDecorator(`${field.id}`, field.validations || {}) (
                <Input type={field.inputType} placeholder={field.label} />
            )}
            {fieldType == "number" && getFieldDecorator(`${field.id}`, field.validations || {}) (
                <InputNumber placeholder={field.label} />
            )}
            {fieldType == "select" && getFieldDecorator(`${field.id}`, field.validations || {}) (
                <Select>
                    {field.children.map((option: Field, on: number) => {
                        return <Select.Option key={on}>{option.label}</Select.Option>
                    })}
                </Select>
            )}
            {fieldType == "radiogroup" && getFieldDecorator(`${field.id}`, field.validations || {})(
                <Radio.Group>
                    {field.children.map((option: Field, on: number) => {
                        return <Radio key={on}>{option.label}</Radio>
                    })}
                </Radio.Group>
            )}
            {fieldType == "textarea" && getFieldDecorator(`${field.id}`, field.validations || {})(
                <Input.TextArea></Input.TextArea>
            )}
        </Form.Item>
    }

    render() {
        const { getFieldDecorator, getFieldError, getFieldsValue, setFieldsValue } = this.props.form;
        const numPages = this.props.content.pages.length;
        let self = this;
        const renderField = this.renderField;
        return (
            <div>
                <Card title={this.props.name}>
                    <Form onSubmit={this.handleSubmit.bind(this)} layout={this.props.layout}>
                        {this.props.content.pages.map((page: Page, pn: number) => {
                            const numSections = page.sections.length;
                            return <div className="page" key={pn}>
                                {page.sections.map((section: Section, sn: number) => {
                                    const numFields = section.fields.length;
                                    return <Card key={sn} title={section.name}>
                                        { section.fields.map((field: Field, fn: number) => {
                                            return this.renderField(field, fn);
                                        })}
                                    </Card>
                                })}
                            </div>
                        })}
                        <br/>
                        <Form.Item {...this.props.formItemLayout}>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create()(FormComponent)