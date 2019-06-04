import * as React from "react";
import { IFieldProps } from "@kartikrao/lib-forms-core/lib/models/field.properties";
import RootStore from "../models/RootStore";
export interface FieldProps {
    field: IFieldProps;
    store: RootStore;
    eventHooks: any;
}
export declare class FieldComponent extends React.Component<FieldProps, any> {
    props: FieldProps;
    constructor(props: FieldProps);
    render(): JSX.Element;
}
