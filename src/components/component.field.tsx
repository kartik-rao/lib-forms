import * as React from "react";
import * as ReactDOM from "react-dom";

import {IField, RadioSelectCheckboxOption} from "../models/field";
import {Form, Button, Input, Select, Radio, DatePicker, InputNumber, Card, Pagination, Row, Col, Checkbox} from "antd";

export class FieldComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.props = props;

        this.state = {
            hidden: props.field.fieldOptions.hidden,
            condition: props.field.condition.value(props.form)
        }
    }

    render() {
        const {field, onChange} = this.props;
        const {getFieldDecorator, getFieldError} = this.props.form;
        const fieldType = field.type;
        const condition = this.state.condition;
        field.fieldOptions.hidden = !condition;
        const withDecorator = getFieldDecorator(field.id, field.fieldOptions);
        const errors = getFieldError(field.id);

        console.log(`${field.id} ${condition}`)
        return condition ? <Form.Item label={field.label} {...this.props.formItemLayout}>
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
}