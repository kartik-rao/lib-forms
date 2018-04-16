import * as React from "react";
import * as ReactDOM from "react-dom";

import {Form, Button, Input, Select, Radio, DatePicker} from "antd";
import {IFormProps} from "../models/model.form";

import {Page} from "../models/model.page";
import {PageComponent} from "./component.page";
import {Field} from "../models/model.field";

import {Section} from "../models/model.section";
import {SectionComponent} from "./component.section";

class FormComponent extends React.Component<IFormProps, any> {
    constructor(props: IFormProps) {
        super(props);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("THIS IS",this);
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    }

    renderField(field: Field, fn: number) {
        const fieldType = field.type;
        const {getFieldDecorator} = this.props.form;
        const config = {
            valuePropName: field.name,
            rules: [{ type: 'object', required: true, message: field.helpText }],
          };
          const rangeConfig = {
            rules: [{ type: 'array', required: true, message: field.helpText }],
          };
        return <Form.Item label={field.showLabel ? field.label:''} key={fn} required={false}>
            {fieldType == "input" && getFieldDecorator(`${field.id}`, config) (
                <Input placeholder={field.label} />
            )}
            {fieldType == "select" && getFieldDecorator(`${field.id}`, rangeConfig) (
                <Select>
                    {field.children.map((option: Field, on: number) => {
                        return <Select.Option key={on}>{option.label}</Select.Option>
                    })}
                </Select>
            )}
            {fieldType == "radiogroup" && getFieldDecorator(`${field.id}`, rangeConfig)(
                <Radio.Group>
                    {field.children.map((option: Field, on: number) => {
                        return <Radio key={on}>{option.label}</Radio>
                    })}
                </Radio.Group>
            )}
            {fieldType == "textarea" && getFieldDecorator(`${field.id}`, config)(
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
            <Form onSubmit={this.handleSubmit.bind(this)}>
                {this.props.content.pages.map((page: Page, pn: number) => {
                    const numSections = page.sections.length;
                    return <div className="page" key={pn}>
                        {page.sections.map((section: Section, sn: number) => {
                            const numFields = section.fields.length;
                            return <div className="section" key={sn}>
                            {section.fields.map((field: Field, fn: number)=>{
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
                            </div>
                        })}
                    </div>
                })}
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form>
        )
    }
}

export default Form.create()(FormComponent)