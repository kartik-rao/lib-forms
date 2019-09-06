import { Column } from "@kartikrao/lib-forms-core";
import * as React from "react";
export interface IColumnItemProps {
    col: Column;
    key: string;
    index: number;
    pageIndex: number;
    sectionIndex: number;
}
export declare const ColumnItem: React.FC<IColumnItemProps>;
