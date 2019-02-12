import * as React from "react";
import {IField, FormLayoutOptions} from "@adinfinity/ai-core-forms";
import {RadioSelectCheckboxOption} from "@adinfinity/ai-core-forms";
import {Form, Input, Select, Radio, DatePicker, InputNumber, Checkbox, Rate, Slider} from "antd";


export interface FieldProps {
    field: IField;
    formLayout: FormLayoutOptions;
    decorators: any;
    eventHooks:any;
    conditionals:any;

}

export class FieldComponent extends React.Component<FieldProps, any> {

    constructor(props: FieldProps) {
        super(props);
        this.props = props;
        this.state = {
            hidden :!props.conditionals[this.props.field.id].result
        }
    }

    render() {
        const {field, decorators, formLayout, eventHooks} = this.props;
        const {type} = field;

        let decorator : any = decorators.getFieldDecorator;
        let {onChange} = eventHooks(field.id)

        return this.props.conditionals[this.props.field.id].result && <Form.Item label={field.label} {...formLayout}>
            {(type == "input" || type == "hidden") && decorator(field.id, field.fieldOptions)(
                <Input onChange={onChange} type={field.inputType} placeholder={field.placeholder} />)
            }
            {type == "checkbox" && decorator(field.id, field.fieldOptions)(
                <Checkbox onChange={onChange}/>)
            }
            {type == "number" && decorator(field.id, field.fieldOptions)(
                <InputNumber onChange={onChange} />
            )}
            {type == "select" && decorator(field.id, field.fieldOptions)(
                <Select onChange={onChange}>
                    {field.children.map((child: any, index: number) => {
                        return <Select.Option key={""+index} value={child.value}>{child.label}</Select.Option>
                    })}
                </Select>
            )}
            {type == "radiogroup" && decorator(field.id, field.fieldOptions)(
                <Radio.Group onChange={onChange} options={field.children}>
                    {/* {field.children.map((child: any, index: number)  => {
                        return <Radio key={""+index} value={child.value}>{child.label}</Radio>
                    })} */}
                </Radio.Group>
            )}
            {type == "checkboxgroup" && decorator(field.id, field.fieldOptions)(
                <Checkbox.Group onChange={onChange} options={field.children} />
            )}
            {type == "textarea" && decorator(field.id, field.fieldOptions)(
                <Input.TextArea onChange={onChange}></Input.TextArea>
            )}
            {type == "datepicker" && decorator(field.id, field.fieldOptions)(
                <DatePicker onChange={onChange}/>
            )}
            {type == "monthpicker" && decorator(field.id, field.fieldOptions)(
                <DatePicker.MonthPicker onChange={onChange}/>
            )}
            {type == "rangepicker" && decorator(field.id, field.fieldOptions)(
               <DatePicker.RangePicker onChange={onChange}/>
            )}
            {type == "weekpicker" && decorator(field.id, field.fieldOptions)(
                <DatePicker.WeekPicker onChange={onChange}/>
            )}
            {type == 'rate' && decorator(field.id, field.fieldOptions)(
                <Rate onChange={onChange}></Rate>
            )}
            {type == 'slider' && decorator(field.id, field.fieldOptions)(
                <Slider onChange={onChange}></Slider>
            )}
            {type == "textblock" && <p>{field.value}</p>}
            </Form.Item>
    }
}