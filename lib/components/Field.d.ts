import * as React from "react";
import { IField, FormLayoutOptions } from "@adinfinity/ai-core-forms";
export interface FieldProps {
    field: IField;
    formLayout: FormLayoutOptions;
    decorators: any;
    eventHooks: any;
    conditionals: any;
}
export declare class FieldComponent extends React.Component<FieldProps, any> {
    constructor(props: FieldProps);
    render(): JSX.Element;
}
