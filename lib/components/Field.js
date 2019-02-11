import * as React from "react";
import { Form, Input, Select, Radio, DatePicker, InputNumber, Checkbox, Rate, Slider } from "antd";
export class FieldComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            hidden: !props.conditionals[this.props.field.id].result
        };
    }
    render() {
        const { field, decorators, formLayout, eventHooks } = this.props;
        const { type } = field;
        let decorator = decorators.getFieldDecorator;
        let { onChange } = eventHooks(field.id);
        return this.props.conditionals[this.props.field.id].result && React.createElement(Form.Item, Object.assign({ label: field.label }, formLayout),
            (type == "input" || type == "hidden") && decorator(field.id, field.fieldOptions)(React.createElement(Input, { onChange: onChange, type: field.inputType, placeholder: field.placeholder })),
            type == "checkbox" && decorator(field.id, field.fieldOptions)(React.createElement(Checkbox, { onChange: onChange })),
            type == "number" && decorator(field.id, field.fieldOptions)(React.createElement(InputNumber, { onChange: onChange })),
            type == "select" && decorator(field.id, field.fieldOptions)(React.createElement(Select, { onChange: onChange }, field.children.map((child, index) => {
                return React.createElement(Select.Option, { key: "" + index, value: child.value }, child.label);
            }))),
            type == "radiogroup" && decorator(field.id, field.fieldOptions)(React.createElement(Radio.Group, { onChange: onChange, options: field.children })),
            type == "checkboxgroup" && decorator(field.id, field.fieldOptions)(React.createElement(Checkbox.Group, { onChange: onChange, options: field.children })),
            type == "textarea" && decorator(field.id, field.fieldOptions)(React.createElement(Input.TextArea, { onChange: onChange })),
            type == "datepicker" && decorator(field.id, field.fieldOptions)(React.createElement(DatePicker, { onChange: onChange })),
            type == "monthpicker" && decorator(field.id, field.fieldOptions)(React.createElement(DatePicker.MonthPicker, { onChange: onChange })),
            type == "rangepicker" && decorator(field.id, field.fieldOptions)(React.createElement(DatePicker.RangePicker, { onChange: onChange })),
            type == "weekpicker" && decorator(field.id, field.fieldOptions)(React.createElement(DatePicker.WeekPicker, { onChange: onChange })),
            type == 'rate' && decorator(field.id, field.fieldOptions)(React.createElement(Rate, { onChange: onChange })),
            type == 'slider' && decorator(field.id, field.fieldOptions)(React.createElement(Slider, { onChange: onChange })),
            type == "textblock" && React.createElement("p", null, field.value));
    }
}
