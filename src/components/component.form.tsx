import * as React from "react";
import * as ReactDOM from "react-dom";

import {Form, Button, Input, Select, Radio, DatePicker, InputNumber, Card, Pagination, Row, Col, Checkbox} from "antd";
import {IFormProps} from "../models/model.form";

import {Page} from "../models/model.page";
import {IField, RadioSelectCheckboxOption} from "../models/model.field";
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

    renderPage(page: Page, pn: number) {
        const numSections = page.sections.length;
        return <div className="page" key={pn}>
            {page.sections.map((section: Section, sn: number) => {
                return this.renderSection(section, sn);
            })}
        </div>
    }

    renderSection(section: Section, sn: number) {
        const numFields = section.fields.length;
        return <Card key={sn} title={section.name}>
            { section.fields.map((field: IField, fn: number) => {
                return this.renderField(field, fn);
            })}
        </Card>
    }

    renderField(field: IField, fn: number) {
        const fieldType = field.type;
        const {getFieldDecorator} = this.props.form;

        return <Form.Item label={field.label} key={fn} required={false} {...this.props.formItemLayout}>
            {fieldType == "input" && getFieldDecorator(`${field.id}`, field.fieldOptions) (
                <Input type={field.inputType} placeholder={field.placeholder} />
            )}
            {fieldType == "checkbox" && getFieldDecorator(`${field.id}`, field.fieldOptions) (
                <Checkbox />
            )}
            {fieldType == "number" && getFieldDecorator(`${field.id}`, field.fieldOptions) (
                <InputNumber />
            )}
            {fieldType == "select" && getFieldDecorator(`${field.id}`, field.fieldOptions) (
                <Select>
                    {field.children.map((option: RadioSelectCheckboxOption, on: number) => {
                        return <Select.Option key={on}>{option.label}</Select.Option>
                    })}
                </Select>
            )}
            {fieldType == "radiogroup" && getFieldDecorator(`${field.id}`, field.fieldOptions)(
                <Radio.Group>
                    {field.children.map((option: RadioSelectCheckboxOption, on: number) => {
                        return <Radio key={on}>{option.label}</Radio>
                    })}
                </Radio.Group>
            )}
            {fieldType == "checkboxgroup" && getFieldDecorator(`${field.id}`, field.fieldOptions) (
                <Checkbox.Group options={field.children} />
            )}
            {fieldType == "textarea" && getFieldDecorator(`${field.id}`, field.fieldOptions)(
                <Input.TextArea></Input.TextArea>
            )}
            {fieldType == "datepicker" && getFieldDecorator(`${field.id}`, field.fieldOptions)(
                <DatePicker/>
            )}
            {fieldType == "monthpicker" && getFieldDecorator(`${field.id}`, field.fieldOptions)(
                <DatePicker.MonthPicker />
            )}
            {fieldType == "rangepicker" && getFieldDecorator(`${field.id}`, field.fieldOptions)(
               <DatePicker.RangePicker/>
            )}
            {fieldType == "weekpicker" && getFieldDecorator(`${field.id}`, field.fieldOptions)(
                <DatePicker.WeekPicker/>
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
                            return this.renderPage(page, pn);
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