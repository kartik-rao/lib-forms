import { Field } from "@kartikrao/lib-forms-core";
import * as React from "react";
export interface IFieldItemProps {
    fld: Field;
    key: string;
    index: number;
    pageIndex: number;
    sectionIndex: number;
    columnIndex: number;
}
export declare const FieldItem: React.FC<IFieldItemProps>;
