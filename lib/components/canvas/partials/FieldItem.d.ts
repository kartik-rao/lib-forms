import { Field } from "@kartikrao/lib-forms-core";
import * as React from "react";
import { RootStore } from "../../../store/RootStore";
export interface IFieldItemProps {
    fld: Field;
    key: string;
    index: number;
    store: RootStore;
}
export declare class FieldItem extends React.Component<IFieldItemProps, any> {
    render(): JSX.Element;
}
