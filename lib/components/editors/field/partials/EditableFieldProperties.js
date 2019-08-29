import { DatePicker, Form, Input, InputNumber, Select, Switch } from "antd";
import * as React from "react";
import moment from "moment";
export const makeProp = (key, label, type, other = {}) => {
    let { options, rules, formatKey, formatValue, help, defaultValue } = other;
    return { key: key, label: label, type: type, options: options, rules: rules, formatKey: formatKey, formatValue: formatValue, help: help, defaultValue: defaultValue };
};
const basicProps = [
    makeProp("name", "Name", 'string', { rules: [{ type: "string" }, { required: true, message: "A name is required" }] }),
    makeProp("label", "Label", 'string', [{ type: "string" }, { required: true, message: "A label is required" }]),
    makeProp("helpText", "Help Text", 'text')
];
const ValuePropName = makeProp("fo_valuePropName", "Value Property Name", 'string', { rules: [
        { type: 'string' },
        { required: true, message: 'A value property name is required' },
        { pattern: /^[aA-zZ]+[\w\_]{0,}$/, message: 'Invalid Property Name' },
    ], help: "Starts with an alphabet followed by alphabets, underscores or numbers" });
export const FieldPropertiesMap = {
    "input": [
        ...basicProps,
        ValuePropName,
        makeProp("c_placeholder", "Placeholder", 'string'),
        makeProp("c_defaultValue", "Default Value", 'string'),
        { key: "c_size", label: "Size", type: 'options', options: [
                { label: "default", value: "default" },
                { label: "small", value: "small" },
                { label: "large", value: "large" }
            ],
            defaultValue: 'default' }
    ],
    "radio": [
        ...basicProps,
        ValuePropName,
        makeProp("c_placeholder", "Placeholder", 'string'),
        makeProp("c_defaultChecked", "boolean", 'string'),
    ],
    "checkbox": [
        ...basicProps,
        ValuePropName,
        makeProp("c_defaultChecked", "Checked", 'boolean'),
    ],
    "number": [
        ...basicProps,
        ValuePropName,
        makeProp("c_placeholder", "Placeholder", 'number'),
        makeProp("c_defaultValue", "Default Value", 'number')
    ],
    "select": [
        ...basicProps,
        ValuePropName,
        makeProp("c_defaultValue", "Default Value", 'string'),
    ],
    "cascader": [
        ...basicProps,
        ValuePropName,
        makeProp("c_defaultValue", "Default Value", 'string')
    ],
    "radiogroup": [
        ...basicProps,
        ValuePropName,
        makeProp("c_defaultValue", "Default Value", 'string')
    ],
    "checkboxgroup": [
        ...basicProps,
        ValuePropName,
        makeProp("c_defaultValue", "Default Value", 'string')
    ],
    "textarea": [
        ...basicProps,
        ValuePropName,
        makeProp("c_defaultValue", "Default Value", 'string')
    ],
    "textblock": [
        ...basicProps,
        makeProp("c_defaultValue", "Content", 'string')
    ],
    "datepicker": [
        ...basicProps,
        ValuePropName,
        { key: "c_dateFormat", label: "Date Format", type: "options", options: [
                { value: "DD-MM-YYYY", label: "DD-MM-YYYY" },
                { value: "MM-DD-YYYY", label: "MM-DD-YYYY" },
                { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
                { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
                { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
                { value: "YYYY/MM/DD", label: "YYYY/MM/DD" }
            ], defaultValue: "YYYY-MM-DD" }
    ],
    "daterange": [
        ...basicProps,
        { key: "c_dateFormat", label: "Date Format", type: "options", options: [
                { value: "DD-MM-YYYY", label: "DD-MM-YYYY" },
                { value: "MM-DD-YYYY", label: "MM-DD-YYYY" },
                { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
                { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
                { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
                { value: "YYYY/MM/DD", label: "YYYY/MM/DD" }
            ], defaultValue: "YYYY-MM-DD" },
        { key: "c_defaultStartValue", label: "Default Start Date", type: "date", formatKey: 'c_dateFormat' },
        { key: "c_defaultEndValue", label: "Default End Date", type: "date", formatKey: 'c_dateFormat' },
        { key: "c_startValuePropsName", label: "Start Date Property Name", type: "string", rules: [{ pattern: /^[aA-zZ][\w|_|0-9]+/, message: "Must be valid property name" }] },
        { key: "c_endValuePropsName", label: "Start Date Property Name", type: "string", rules: [{ pattern: /^[aA-zZ][\w|_|0-9]+/, message: "Must be valid property name" }] },
    ]
};
export const asDecoratedProperty = (item, decorator, valueFn, config, index) => {
    let { key, label, type, options, rules, required, formatValue, formatKey, help, defaultValue } = config;
    let isCprop = key.indexOf("c_") > -1;
    let isFoProp = key.indexOf("fo_") > -1;
    let unprefixKey = isCprop ? key.replace("c_", "") : (isFoProp ? key.replace("fo_", "") : key);
    let initialValue = isCprop ? item.componentProps[unprefixKey] : (isFoProp ? item.fieldOptions[unprefixKey] : item[unprefixKey]);
    let format;
    if (type == 'date') {
        if (formatValue || formatKey) {
            // Fetch format from existing property on the field
            format = formatValue ? formatValue : valueFn(formatKey);
        }
        if (initialValue) {
            // ANTD requires this to be a moment object
            initialValue = moment(initialValue, format);
        }
    }
    let fragment;
    switch (type) {
        case "string":
            fragment = React.createElement(Input, null);
            break;
        case "text":
            fragment = React.createElement(Input.TextArea, null);
            break;
        case "boolean":
            fragment = React.createElement(Switch, null);
            break;
        case "number":
            fragment = React.createElement(InputNumber, null);
            break;
        case "options": {
            fragment = React.createElement(Select, null, options && options.map((opt, oi) => {
                return React.createElement(Select.Option, { key: oi, value: opt.value }, opt.label);
            }));
            break;
        }
        case "date":
            fragment = React.createElement(DatePicker, { format: format });
            break;
    }
    let value = (typeof initialValue != 'undefined' && initialValue != null) ? initialValue : defaultValue;
    let valuePropName = (item.inputType == 'checkbox' && unprefixKey == 'defaultChecked') ? 'checked' : 'value';
    return React.createElement(Form.Item, { label: label, required: required, key: index, help: help }, decorator(key, {
        valuePropName: valuePropName,
        initialValue: value,
        rules: rules
    })(fragment));
};
