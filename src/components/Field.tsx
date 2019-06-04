import * as React from "react";
import {IFieldProps} from "@kartikrao/lib-forms-core/lib/models/field.properties";
import {IFormLayoutOptions} from "@kartikrao/lib-forms-core/lib/models/form.properties";
import {Form, Input, Select, Radio, DatePicker, InputNumber, Checkbox, Rate, Slider} from "antd";
import RootStore from "../models/RootStore";
import { observer } from "mobx-react";

export interface FieldProps {
    field: IFieldProps;
    store: RootStore;
    eventHooks:any;
}

@observer
export class FieldComponent extends React.Component<FieldProps, any> {

    props: FieldProps;
    constructor(props: FieldProps) {
        super(props);
        this.props = props;
    }

    render() {
        const {field, eventHooks, store} = this.props;
        const {type} = field;
        let {result} = store.conditionals[field.id];

        let {onChange, onBlur} = eventHooks();
        let handleChange = (e: any) => {onChange(name, e.target ? e.target.value: e)};
        let handleBlur = () => onBlur(name);

        return result && <Form.Item
            label={field.label}
            hasFeedback={store.touched[name] && !!store.errors[name]}
            validateStatus={store.errors[name] && "error"}
            help={store.errors[name]}>
            {
                (type == "input" || type == "hidden") && <Input
                    type={field.inputType}
                    placeholder={field.placeholder}
                    value={store.values[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}/>
            }
            {type == "checkbox" && <Checkbox onChange={handleChange} checked={store.values[name] == true}/>}
            {type == "number" && <InputNumber onChange={handleChange} onBlur={handleBlur} value={store.values[name]}/>}
            {type == "select" && <Select onChange={handleChange} onBlur={handleBlur} value={store.values[name]}>
                {field.children.map((child: any, index: number) => {
                    return <Select.Option key={""+index} value={child.value}>{child.label}</Select.Option>
                })}
                </Select>
            }
            {type == "radiogroup" && <Radio.Group onChange={handleChange} options={field.children} value={store.values[name]}>
                    {/* {field.children.map((child: any, index: number)  => {
                        return <Radio key={""+index} value={child.value}>{child.label}</Radio>
                    })} */}
                </Radio.Group>
            }
            {type == "checkboxgroup" && <Checkbox.Group onChange={handleChange} options={field.children} value={store.values[name]}/>}
            {type == "textarea" && <Input.TextArea onChange={handleChange} value={store.values[name]}></Input.TextArea>}
            {type == "datepicker" && <DatePicker onChange={handleChange} value={store.values[name]}/>}
            {type == "monthpicker" && <DatePicker.MonthPicker onChange={handleChange} value={store.values[name]}/>}
            {type == "rangepicker" && <DatePicker.RangePicker onChange={handleChange} value={store.values[name]}/>}
            {type == "weekpicker" && <DatePicker.WeekPicker onChange={handleChange} value={store.values[name]}/>}
            {type == 'rate' && <Rate onChange={handleChange} value={store.values[name]}></Rate>}
            {type == 'slider' && <Slider onChange={handleChange} value={store.values[name]}></Slider>}
            {type == "textblock" && <p>{field.value}</p>}
            </Form.Item>
    }
}