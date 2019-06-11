import Column from "@kartikrao/lib-forms-core/lib/models/column";
import * as React from "react";
import RootStore from "../../../store/RootStore";
export interface IColumnItemProps {
    col: Column;
    key: string;
    index: number;
    store: RootStore;
}
export declare class ColumnItem extends React.Component<IColumnItemProps, any> {
    render(): JSX.Element;
}
