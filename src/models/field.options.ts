import {FieldValidationRule, FieldValidation} from "./field.validation";
import {valueOrDefault} from "./common";

export interface IFieldOptions {
    id: string;
    getValueFromEvent?: (...args) => any;
    initialValue?: any;
    normalize?: (value: any, prevValue: any, allValues: any) => any;
    rules?: FieldValidationRule[];
    trigger?: string;
    validateFirst?: boolean;
    validateTrigger?: string | string[];
    valuePropName?: string;
    hidden?: boolean;
}

export class FieldOptions implements IFieldOptions {
    id: string = null;
    getValueFromEvent?: (...args) => any = null;
    initialValue?: any = null;
    normalize?: (value: any, prevValue: any, allValues: any) => any = null;
    rules?: FieldValidationRule[];
    trigger?: string;
    validateFirst?: boolean;
    validateTrigger?: string | string[];
    valuePropName?: string;
    hidden?: boolean;

    constructor(props: IFieldOptions) {
        this.id = props.id;
        this.getValueFromEvent = props.getValueFromEvent;
        this.initialValue = props.initialValue;
        this.normalize = props.normalize;
        this.rules = new FieldValidation().addRules(props.rules).rules;
        this.trigger = valueOrDefault(props.trigger, "onChange");
        this.validateFirst = valueOrDefault(props.validateFirst, false);
        this.validateTrigger = valueOrDefault(props.validateTrigger, ["onChange", "onBlur"]);
        this.valuePropName = valueOrDefault(props.valuePropName, 'value');
        this.hidden = props.hidden || false;
    }
}