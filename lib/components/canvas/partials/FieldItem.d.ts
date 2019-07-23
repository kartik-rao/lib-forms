import { Field } from "@kartikrao/lib-forms-core";
import * as React from "react";
import { EditorStore } from "../../../store/EditorStore";
export interface IFieldItemProps {
    fld: Field;
    key: string;
    index: number;
    store: EditorStore;
}
export declare class FieldItem extends React.Component<IFieldItemProps, any> {
    render(): JSX.Element;
}
