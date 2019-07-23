import { Column } from "@kartikrao/lib-forms-core";
import * as React from "react";
import { EditorStore } from "../../../store/EditorStore";
export interface IColumnItemProps {
    col: Column;
    key: string;
    index: number;
    store: EditorStore;
}
export declare class ColumnItem extends React.Component<IColumnItemProps, any> {
    render(): JSX.Element;
}
