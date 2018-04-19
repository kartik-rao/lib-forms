import * as React from "react";
import * as ReactDOM from "react-dom";

import {Form, Button, Input, Select, Radio, DatePicker, InputNumber, Card, Pagination, Row, Col, Checkbox} from "antd";

import {IFormProps} from "../models/form";
import {IPage} from "../models/page";
import {ISection} from "../models/section";
import {IField, RadioSelectCheckboxOption} from "../models/field";

class FormComponent extends React.Component<IFormProps, any> {

    constructor(props: IFormProps) {
        super(props);
        const state = {confirmDirty: false, render: {}}
        props.content.allFields.forEach((f: IField) => {
            state[`cond_${f.id}`] = f.condition;
            state[`condval_${f.id}`] = f.condition.value(this.props.form);
        });
        this.state = state;
    }

    handleSubmit(e) {
        e.preventDefault();
        let self = this;
        this.props.form.validateFields((err, values) => {
          if (!err) {
                let payload = Object.assign({payload: values}, {props: self.state.innerProps});
                console.log('Received values of form: ', payload);
          }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    renderPage(page: IPage, pn: number) {
        const numSections = page.sections.length;
        return <div className="page" key={pn}>
            {page.sections.map((section: ISection, sn: number) => {
                return this.renderSection(section, sn);
            })}
        </div>
    }

    renderSection(section: ISection, sn: number) {
        const numFields = section.fields.length;
        return <Card key={sn} title={section.name}>
            { section.fields.map((field: IField, fn: number) => {
                return this.renderField(field, fn);
            })}
        </Card>
    }

    onChange(id: string) {
        let self = this;
        const {getFieldValue, getFieldsValue, getFieldError, isFieldTouched, isFieldValidating} = this.props.form;
        setTimeout(() => {
            let deps = self.props.content.dependencyMap[id] || [];
            deps.forEach((d) => {
                let conditionState = {}
                conditionState[`condval_${d}`] = self.state[`cond_${d}`].value(self.props.form);;
                self.setState(conditionState);
            });
            const value = getFieldValue(id);
            const error = getFieldError(id);
            const touched = isFieldTouched(id);
            console.log(`Field ${id} touched=[${touched}] value=[${value}] error=[${error}]`);
        });
        return;
    }

    renderField(field: IField, fn: number) {
        const fieldType = field.type;
        const {getFieldDecorator, getFieldError} = this.props.form;
        const onChange = this.onChange.bind(this, field.id);
        const onBlur = this.handleConfirmBlur.bind(this);

        const condition = this.state[`condval_${field.id}`];
        field.fieldOptions.hidden = !condition;
        const withDecorator = getFieldDecorator(field.id, field.fieldOptions);
        const errors = getFieldError(field.id);

        return condition ? <Form.Item label={field.label} key={fn} {...this.props.formItemLayout}>
            {(fieldType == "input" || fieldType == "hidden") && withDecorator(
                <Input onChange={onChange} type={field.inputType} placeholder={field.placeholder} />
            )}
            {fieldType == "checkbox" && withDecorator (
                <Checkbox onChange={onChange}/>
            )}
            {fieldType == "number" && withDecorator (
                <InputNumber onChange={onChange} />
            )}
            {fieldType == "select" && withDecorator (
                <Select onChange={onChange}>
                    {field.children.map((option: RadioSelectCheckboxOption, on: number) => {
                        return <Select.Option key={on}>{option.label}</Select.Option>
                    })}
                </Select>
            )}
            {fieldType == "radiogroup" && withDecorator(
                <Radio.Group onChange={onChange}>
                    {field.children.map((option: RadioSelectCheckboxOption, on: number) => {
                        return <Radio key={on}>{option.label}</Radio>
                    })}
                </Radio.Group>
            )}
            {fieldType == "checkboxgroup" && withDecorator (
                <Checkbox.Group onChange={onChange} options={field.children} />
            )}
            {fieldType == "textarea" && withDecorator(
                <Input.TextArea onChange={onChange}></Input.TextArea>
            )}
            {fieldType == "datepicker" && withDecorator(
                <DatePicker onChange={onChange}/>
            )}
            {fieldType == "monthpicker" && withDecorator(
                <DatePicker.MonthPicker onChange={onChange}/>
            )}
            {fieldType == "rangepicker" && withDecorator(
               <DatePicker.RangePicker onChange={onChange}/>
            )}
            {fieldType == "weekpicker" && withDecorator(
                <DatePicker.WeekPicker onChange={onChange}/>
            )}
        </Form.Item> : ''
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
                        {this.props.content.pages.map((page: IPage, pn: number) => {
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

export default Form.create()(FormComponent);