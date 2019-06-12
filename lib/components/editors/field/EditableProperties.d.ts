import { ChoiceOption, IFieldProps } from "@kartikrao/lib-forms-core";
import * as React from "react";
export declare const makeProp: (key: string, label: string, type: string, other?: any) => IFieldDecoratorConfig;
interface IFieldDecoratorConfig {
    key: string;
    label: string;
    options?: ChoiceOption[];
    type: string;
    required?: boolean;
    rules?: any[];
    formatValue?: string;
    formatKey?: string;
    help: string;
}
export declare const FieldPropertiesMap: {
    "input": IFieldDecoratorConfig[];
    "radio": IFieldDecoratorConfig[];
    "checkbox": (IFieldDecoratorConfig | {
        key: string;
        label: string;
        type: string;
        options: {
            label: string;
            value: string;
        }[];
    })[];
    "number": IFieldDecoratorConfig[];
    "select": IFieldDecoratorConfig[];
    "cascader": IFieldDecoratorConfig[];
    "radiogroup": IFieldDecoratorConfig[];
    "checkboxgroup": IFieldDecoratorConfig[];
    "textarea": IFieldDecoratorConfig[];
    "textblock": IFieldDecoratorConfig[];
    "datepicker": (IFieldDecoratorConfig | {
        key: string;
        label: string;
        type: string;
        options: {
            value: string;
            label: string;
        }[];
    })[];
    "daterange": (IFieldDecoratorConfig | {
        key: string;
        label: string;
        type: string;
        options: {
            value: string;
            label: string;
        }[];
        formatKey?: undefined;
        rules?: undefined;
    } | {
        key: string;
        label: string;
        type: string;
        formatKey: string;
        options?: undefined;
        rules?: undefined;
    } | {
        key: string;
        label: string;
        type: string;
        rules: {
            pattern: RegExp;
            message: string;
        }[];
        options?: undefined;
        formatKey?: undefined;
    })[];
};
export declare const generateFieldItems: (field: IFieldProps, getFieldDecorator: any, getFieldValue: any) => JSX.Element;
export declare const asDecoratedProperty: (item: IFieldProps, decorator: any, valueFn: any, config: IFieldDecoratorConfig, index: any) => React.ReactNode;
export {};
