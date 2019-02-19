import { IField } from "@adinfinity/ai-core-forms";
export declare class FormStateHelper {
    static getInitialState(formData: any, decorators: any): any;
    static registerValidations(validation: any, field: IField): void;
    static registerFieldConditions(fields: IField[], state: any, decorators: any): any;
    static deregisterFieldConditions(fields: IField[], state: any, evaluators: any): any;
}
