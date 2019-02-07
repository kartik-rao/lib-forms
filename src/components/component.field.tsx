import * as React from "react";

import {RadioSelectCheckboxOption} from "@adinfinity/ai-core-forms";
import {Form, Input, Select, Radio, DatePicker, InputNumber, Checkbox, Rate, Slider} from "antd";

export class FieldComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.props = props;
    }

    render() {
        const {field, onChange, decorator, itemLayout} = this.props;
        const {type} = field;
        return <Form.Item label={field.label} {...itemLayout}>
            {(type == "input" || type == "hidden") && decorator(
                <Input onChange={onChange} type={field.inputType} placeholder={field.placeholder} />
            )}
            {type == "checkbox" && decorator (
                <Checkbox onChange={onChange}/>
            )}
            {type == "number" && decorator (
                <InputNumber onChange={onChange} />
            )}
            {type == "select" && decorator (
                <Select onChange={onChange}>
                    {field.children.map((option: RadioSelectCheckboxOption, on: number) => {
                        return <Select.Option key={on}>{option.label}</Select.Option>
                    })}
                </Select>
            )}
            {type == "radiogroup" && decorator(
                <Radio.Group onChange={onChange}>
                    {field.children.map((option: RadioSelectCheckboxOption, on: number) => {
                        return <Radio key={on}>{option.label}</Radio>
                    })}
                </Radio.Group>
            )}
            {type == "checkboxgroup" && decorator (
                <Checkbox.Group onChange={onChange} options={field.children} />
            )}
            {type == "textarea" && decorator(
                <Input.TextArea onChange={onChange}></Input.TextArea>
            )}
            {type == "datepicker" && decorator(
                <DatePicker onChange={onChange}/>
            )}
            {type == "monthpicker" && decorator(
                <DatePicker.MonthPicker onChange={onChange}/>
            )}
            {type == "rangepicker" && decorator(
               <DatePicker.RangePicker onChange={onChange}/>
            )}
            {type == "weekpicker" && decorator(
                <DatePicker.WeekPicker onChange={onChange}/>
            )}
            {type == 'rate' && decorator(
                <Rate onChange={onChange}></Rate>
            )}
            {type == 'slider' && decorator(
                <Slider onChange={onChange}></Slider>
            )}
            {type == "textblock" && <p>{field.value}</p>}
            </Form.Item>
    }
}