import {valueOrDefault} from "./common";

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

export interface IFieldValidationRule {
    enum?: string;
    len?: number
    max?: number;
    message: string;
    min? : number;
    pattern?: RegExp;
    required: boolean;
    transform?: any;
    type?: FieldType
    validator?: (rule: any, value: any, callback: any) => void;
    whitespace?: boolean;
}

export class FieldValidationRule implements IFieldValidationRule {
    enum?: string;
    len?: number
    max?: number;
    message: string;
    min? : number;
    pattern?: RegExp;
    required: boolean;
    transform?: any;
    type: FieldType
    validator?: (rule: any, value: any, callback: any) => void;
    whitespace?: boolean;

    constructor(props: any) {
        this.enum = props.enum;
        this.len = props.len;
        this.min = props.min;
        this.max = props.max;
        this.message = props.message;
        this.pattern = props.pattern;
        this.required = valueOrDefault(props.required, false);
        this.transform = props.transform;
        this.type = valueOrDefault(props.type, FieldType.string);
        this.validator = props.validator;
        this.whitespace = props.whitespace;
    }
}

export class FieldValidation {
    public rules: FieldValidationRule[] = [];

    addRule(rule: any) : void {
        this.rules.push(new FieldValidationRule(rule))
    }

    addRules(rules: any[] = []) : FieldValidation {
        let self = this;
        rules.forEach((r) => {
            self.addRule(r);
        });
        return this;
    }
}