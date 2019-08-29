import { ValidationRule } from "@kartikrao/lib-forms-core";
import * as React from "react";
export interface IValidationListViewProps {
    validation: ValidationRule;
    onRemove: (rule: string) => void;
    onEdit: (rule: string) => void;
}
export declare const ValidationListView: React.FC<IValidationListViewProps>;
