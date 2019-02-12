import { IField } from "@adinfinity/ai-core-forms";
export declare class FormStateHelper {
    static getInitialState(formData: any, evaluators: any, decorators: any): any;
    static registerFieldConditions(fields: IField[], state: any, evaluators: any, decorators: any): any;
    static deregisterFieldConditions(fields: IField[], state: any, evaluators: any): any;
}
