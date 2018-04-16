import {CheckboxOptionType} from "antd/lib/checkbox/Group"

function valueOrDefault<T>(value: T, defaultValue: T|null): T {
    return (typeof(value) !== 'undefined' && value !== null ? value : defaultValue);
}
export interface FieldStorage {
    unique: boolean;
    name: string;
    type: string;
    customerKey: string;
    description: string;
    isNullable: boolean;
    isPrimaryKey: boolean;
    isRequired: boolean;
    isSendable: boolean;
}

export enum FieldType {
    string = "string", // Must be of type string. This is the default type.
    number = "number", // Must be of type number.
    boolean = "boolean", // Must be of type boolean.
    method = "method", // Must be of type function.
    regexp = "regexp", // Must be an instance of RegExp or a string that does not generate an exception when creating a new RegExp.
    integer = "integer", // Must be of type number and an integer.
    float = "float", // Must be of type number and a floating point number.
    array = "array", // Must be an array as determined by Array.isArray.
    object = "object", // Must be of type object and not Array.isArray.
    enum = "enum", // Value must exist in the enum.
    date = "date", // Value must be valid as determined by Date
    url = "url", // Must be of type url.
    hex = "hex", // Must be of type hex.
    email = "email" // Must be of type email
}

export interface IFieldValidation {
    enum?: string;
    len?: number
    max?: number;
    message: string;
    min? : number;
    pattern: RegExp;
    required: boolean;
    transform: any;
    type?: FieldType
    validator?: (rule: any, value: any, callback: any) => void;
    whitespace?: boolean;
}

export class FieldValidation {
    public rules: IFieldValidation[] = [];

    addRule(rule: IFieldValidation) {
        this.rules.push(rule)
    }

    constructor(props: IFieldValidation) {
        let rule = <IFieldValidation> {};
        rule.enum = props.enum;
        rule.len = props.len;
        rule.max = props.max;
        rule.message = props.enum;
        rule.min = props.min;
        rule.pattern = props.pattern;
        rule.required = props.required;
        rule.transform = props.transform;
        rule.type = props.type;
        rule.validator = props.validator;
        rule.whitespace = props.whitespace;
    }
}

export interface IFieldOptions {
    id: string;
    getValueFromEvent?: (...args) => any;
    initialValue?: any;
    normalize?: (value: any, prevValue: any, allValues: any) => any;
    rules?: IFieldValidation[];
    trigger: string;
    validateFirst: boolean;
    validateTrigger: string | string[];
    valuePropName: string;
}

export interface FieldReflextion {
    onField: string;
    action: string;
    lastResult: string;
}

export class FieldOptions {
    id: string = null;
    getValueFromEvent?: (...args) => any = null;
    initialValue: any = null;
    normalize: (value: any, prevValue: any, allValues: any) => any = null;
    rules: IFieldValidation[];
    trigger: string;
    validateFirst: boolean;
    validateTrigger: string | string[];
    valuePropName: string;

    constructor(props: IFieldOptions) {
        this.id = props.id;
        this.getValueFromEvent = props.getValueFromEvent;
        this.initialValue = props.initialValue;
        this.normalize = props.normalize;
        this.rules = valueOrDefault(props.rules, []);
        this.trigger = valueOrDefault(props.trigger, "onChange");
        this.validateFirst = valueOrDefault(props.validateFirst, false);
        this.validateTrigger = valueOrDefault(props.validateTrigger, 'onChange');
        this.valuePropName = valueOrDefault(props.valuePropName, 'value')
    }
}

export type RadioSelectCheckboxOption = CheckboxOptionType | { label: string, value: string, disabled?: boolean };

export interface IField {
    id?: string;
    name?: string;
    type?: string;
    inputType?: string;
    icon?: string;
    value?: string;
    width?: string;
    children?: RadioSelectCheckboxOption[];
    storage?: FieldStorage;
    showLegend?: boolean;
    showLabel?: boolean;
    enabled?: boolean;
    label?: string;
    helpText?: string;
    helpPlacement?: string;
    placeholder: string;
    fieldOptions: FieldOptions;
    queryParam?: string;
    saveable?: boolean;
}

