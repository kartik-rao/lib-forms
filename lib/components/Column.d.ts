import Column from "@kartikrao/lib-forms-core/lib/models/column";
import * as React from "react";
import RootStore from "../models/RootStore";
export interface ColumnProps {
    column: Column;
    span: number;
    eventHooks: any;
    store: RootStore;
}
export declare class ColumnComponent extends React.Component<ColumnProps, any> {
    state: any;
    props: ColumnProps;
    constructor(props: ColumnProps);
    render(): JSX.Element;
}
