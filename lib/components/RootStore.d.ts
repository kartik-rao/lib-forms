import { IField } from "@adinfinity/ai-core-forms";
export declare class RootStore {
    ancestors: any;
    dependencies: any;
    conditionals: any;
    evaluators: any;
    currentPage: number;
    fieldMeta: any;
    values: any;
    touched: any;
    formData: any;
    selectedField: IField;
    validationSchema: any;
    numPages: number;
    confirmDirty: boolean;
    setFieldValue: any;
    setFieldError: any;
    onchange(id: string, value: any): void;
    onBlur(id: string): void;
    selectField: (field: IField) => void;
    updateField: (f: IField, newState: any) => void;
    onSubmit(values: any, actions: any): boolean;
    readonly validationErrors: any;
    readonly errorOnThisPage: boolean;
    prev(): void;
    next(): void;
    getFieldValue: (id: string) => any;
    constructor(data: any);
}
