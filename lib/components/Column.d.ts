import * as React from "react";
import { IColumn, FormLayoutOptions } from "@adinfinity/ai-core-forms";
export interface ColumnProps {
    column: IColumn;
    formLayout: FormLayoutOptions;
    span: number;
    decorators: any;
    eventHooks: any;
    conditionals: any;
}
export declare class ColumnComponent extends React.Component<ColumnProps, any> {
    state: any;
    props: ColumnProps;
    constructor(props: ColumnProps);
    render(): JSX.Element;
}
