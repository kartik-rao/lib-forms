import { Logger } from "@kartikrao/lib-logging";
import { Card, Form, Input, Select } from "antd";
import * as React from "react";
const logger = Logger.getInstance(["ai-lib-forms", "FieldProperties"], Logger.severity.debug);
export class FieldPropertiesComponent extends React.Component {
    constructor(props) {
        super(props);
        let field = props.field;
        this.state = {
            fieldId: field.id,
            inputType: field.type,
            type: field.fieldOptions.type,
            name: field.name,
            label: field.label,
            placeholder: field.placeholder,
            hidden: field.fieldOptions.hidden,
            children: field.children,
            showLegend: field.showLegend,
            showLabel: field.showLabel,
            initialValue: field.fieldOptions.initialValue,
            validationRules: props.field.fieldOptions.rules,
        };
    }
    componentWillReceiveProps() {
        console.log("FPC will recieve props", arguments);
    }
    onSave() {
    }
    render() {
        return (React.createElement(Card, { title: this.state.name, size: "small" },
            React.createElement(Form, { onSubmit: this.onSave },
                React.createElement(Form.Item, null,
                    React.createElement(Input, { type: "text", disabled: true, value: this.state.fieldId, title: "Id" })),
                React.createElement(Form.Item, null,
                    React.createElement(Input, { type: "text", disabled: true, value: this.state.inputType, title: "Input Type" })),
                React.createElement(Form.Item, null,
                    React.createElement(Input, { type: "text", value: this.state.label, title: "Label" })),
                React.createElement(Form.Item, null,
                    React.createElement(Select, { value: this.state.type, placeholder: "Choose a type for this field's value" },
                        React.createElement(Select.Option, { value: "string" }, "String"),
                        React.createElement(Select.Option, { value: "number" }, "Number"),
                        React.createElement(Select.Option, { value: "boolean" }, "Boolean"),
                        React.createElement(Select.Option, { value: "date" }, "Date"))))));
    }
}
