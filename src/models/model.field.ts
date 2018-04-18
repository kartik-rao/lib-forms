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

export type PredicateCondition = "eq" | "neq" | "gt" | "lt" | "gteq" | "lteq" | "hasval" | "nothasval";
export type PredicateOperator = "or" | "and";

export class Predicate {
    targetField: string;
    condition: PredicateCondition;
    value: any;
    operator: PredicateOperator = "or";
}

export class Condition {
    name: string;
    predicates: Predicate[] = [];

    constructor(name: string, predicates: Predicate[]) {
        this.name = name;
        this.predicates = predicates;
    }

    reduce(lhs:any, rhs:any, op: PredicateOperator) : boolean {
        if (op == 'and') {
            return lhs && rhs;
        } else {
            return lhs || rhs;
        }
    }

    value(form: any) : boolean {
        var state: boolean;
        console.log(`Predicates ${this.name}`, this.predicates);
        if (!this.predicates){
            return true;
        }
        this.predicates.forEach((p, i) => {
            console.log(`Evaluating condition [${name}] ${p.targetField} ${p.condition} ${p.value}`)
            let currentValue = form.getFieldValue(p.targetField);
            let expectedValue = p.value;
            var result: any = null;
            switch(p.condition) {
                case "eq":
                    result = currentValue == expectedValue;
                case "neq":
                    result = currentValue != expectedValue;
                case "gt":
                    result = currentValue > expectedValue;
                case "lt":
                    result = currentValue < expectedValue;
                case "gteq":
                    result = currentValue >= expectedValue;
                case "lteq":
                    result = currentValue <= expectedValue;
                case "hasval":
                    result = typeof(currentValue) != 'undefined' && currentValue != null && currentValue !== "";
                case "nothasval":
                    result = typeof(currentValue) == 'undefined' || currentValue == null || currentValue == "";
                default:
                    result = false;
            }
            state = i == 0 ? result : this.reduce(state, result, p.operator);
        });
        console.log(`Condition ${name} is ${state}`);
        return state;
    }
}

export interface IFieldOptions {
    id: string;
    getValueFromEvent?: (...args) => any;
    initialValue?: any;
    normalize?: (value: any, prevValue: any, allValues: any) => any;
    rules?: IFieldValidation[];
    trigger?: string;
    validateFirst?: boolean;
    validateTrigger?: string | string[];
    valuePropName?: string;
    hidden?: boolean | predicateFN;
}

export class FieldOptions {
    id: string = null;
    getValueFromEvent?: (...args) => any = null;
    initialValue?: any = null;
    normalize?: (value: any, prevValue: any, allValues: any) => any = null;
    rules?: IFieldValidation[];
    trigger?: string;
    validateFirst?: boolean;
    validateTrigger?: string | string[];
    valuePropName?: string;
    hidden: any = false;

    constructor(props: IFieldOptions) {
        this.id = props.id;
        this.getValueFromEvent = props.getValueFromEvent;
        this.initialValue = props.initialValue;
        this.normalize = props.normalize;
        this.rules = valueOrDefault(props.rules, []);
        this.trigger = valueOrDefault(props.trigger, "onChange");
        this.validateFirst = valueOrDefault(props.validateFirst, false);
        this.validateTrigger = valueOrDefault(props.validateTrigger, ["onChange", "onBlur"]);
        this.valuePropName = valueOrDefault(props.valuePropName, 'value');
        this.hidden = props.hidden;
    }
}

export type RadioSelectCheckboxOption = CheckboxOptionType | { label: string, value: string, disabled?: boolean };
type predicateFN = (form: any) => boolean;

export interface IField {
    id?: string;
    name?: string;
    type?: string;
    inputType?: string;
    icon?: string;
    width?: string;
    children?: RadioSelectCheckboxOption[];
    condition?: Condition
    storage?: FieldStorage;
    showLegend?: boolean;
    showLabel?: boolean;
    hidden?: boolean | predicateFN;
    label?: string;
    helpText?: string;
    helpPlacement?: string;
    placeholder: string;
    fieldOptions: FieldOptions;
    queryParam?: string;
    saveable?: boolean;
}

export class FieldFactory {
    static createField(props: any) : IField {
        let field = <IField>{};
        field.id = props.id;
        field.name = props.name;
        field.type = props.type;
        field.inputType = props.inputType;
        field.icon  = props.icon;
        field.width = props.width;
        field.children = props.children;
        field.storage = props.storage;
        field.showLabel = valueOrDefault(props.showLabel, true);
        field.showLegend = valueOrDefault(props.showLabel, true);
        field.fieldOptions = new FieldOptions(Object.assign({id: props.id}, {...props.fieldOptions}));
        field.fieldOptions.hidden = new Condition(props.id, props.condition);
        console.log(field.id, field.fieldOptions)
        field.label = props.label;
        field.helpText = props.helpText;
        field.helpPlacement = props.helpPlacement;
        field.placeholder = props.placeholder;
        field.queryParam = props.queryParam;
        field.saveable = props.saveable;
        return field;
    }
}