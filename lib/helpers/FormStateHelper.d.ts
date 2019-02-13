import { IField } from "@adinfinity/ai-core-forms";
export declare class FormStateHelper {
    static getInitialState(formData: any, evaluators: any, decorators: any): any;
    static registerValidations(validation: any, field: IField): void;
    static registerFieldConditions(fields: IField[], state: any, evaluators: any, decorators: any): any;
    static deregisterFieldConditions(fields: IField[], state: any, evaluators: any): any;
}
