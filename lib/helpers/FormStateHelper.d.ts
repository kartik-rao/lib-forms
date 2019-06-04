import Field from "@kartikrao/lib-forms-core/lib/models/field";
export declare class FormStateHelper {
    static getInitialState(formData: any, decorators: any): any;
    static registerValidations(validation: any, field: Field): void;
    static registerFieldConditions(fields: Field[], state: any, decorators: any): any;
    static deregisterFieldConditions(fields: Field[], state: any, evaluators: any): any;
}
