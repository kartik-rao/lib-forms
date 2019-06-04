import { Logger } from "@kartikrao/lib-logging";
import { Card, Form, Input, Select } from "antd";
import * as React from "react";

const logger: Logger = Logger.getInstance(["ai-lib-forms", "FieldProperties"], Logger.severity.debug);

export class FieldPropertiesComponent extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        let field = props.field;

        this.state = {
            fieldId : field.id,
            inputType: field.type,
            type: field.fieldOptions.type,
            name: field.name,
            label: field.label,
            placeholder: field.placeholder,
            hidden: field.isHidden,
            children: field.children,
            showLegend: field.showLegend,
            showLabel: field.showLabel,
            initialValue: field.fieldOptions.initialValue,
            validationRules: props.field.fieldOptions.rules,
        };
    }

    componentWillReceiveProps() {
        console.log("FPC will recieve props", arguments)
    }

    onSave() {

    }

    render() {
        return (
        <Card title={this.state.name} size="small">
            <Form onSubmit={this.onSave}>
                <Form.Item>
                    <Input type="text" disabled={true} value={this.state.fieldId}  title="Id"></Input>
                </Form.Item>
                <Form.Item>
                    <Input type="text" disabled={true} value={this.state.inputType}  title="Input Type"></Input>
                </Form.Item>
                <Form.Item>
                    <Input type="text" value={this.state.label} title="Label"></Input>
                </Form.Item>

                <Form.Item>
                    <Select value={this.state.type} placeholder="Choose a type for this field's value">
                        <Select.Option value="string">String</Select.Option>
                        <Select.Option value="number">Number</Select.Option>
                        <Select.Option value="boolean">Boolean</Select.Option>
                        <Select.Option value="date">Date</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Card>
        )
    }
}