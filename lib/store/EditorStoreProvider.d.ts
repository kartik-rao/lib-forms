import { FormStoreType } from "@kartikrao/lib-forms-core";
import * as React from "react";
export declare const editorStoreContext: React.Context<{
    selectedField: import("@kartikrao/lib-forms-core").Field;
    selectedPage: import("@kartikrao/lib-forms-core").Page;
    selectedSection: import("@kartikrao/lib-forms-core").Section;
    selectedColumn: import("@kartikrao/lib-forms-core").Column;
    showFormEditor: boolean;
    formStore: {
        errors: {};
        values: {};
        touched: {};
        currentPage: number;
        debug: boolean;
        form: import("@kartikrao/lib-forms-core").Form;
        isReady: boolean;
        submitting: boolean;
        validationDisabled: boolean;
        conditionsDisabled: boolean;
        readonly idFieldMap: {
            [key: string]: import("@kartikrao/lib-forms-core").Field;
        };
        readonly uuidFieldMap: {
            [key: string]: import("@kartikrao/lib-forms-core").Field;
        };
        readonly fieldNames: string[];
        readonly isValid: boolean;
        setSubmitting(value: boolean): void;
        readonly isSubmitting: boolean;
        readonly numPages: number;
        readonly hasNextPage: boolean;
        readonly hasPrevPage: boolean;
        readonly isSubmittable: boolean;
        nextPage: () => void;
        prevPage: () => void;
        setForm: (form: import("@kartikrao/lib-forms-core").Form) => void;
        setFieldValue: (id: string, value: any) => void;
        setFieldTouched: (id: string) => void;
        setFieldError: (id: string, error: any) => void;
    } & import("mobx").IObservableObject;
    factory: import("@kartikrao/lib-forms-core").Factory;
    setFormStore: (store: {
        errors: {};
        values: {};
        touched: {};
        currentPage: number;
        debug: boolean;
        form: import("@kartikrao/lib-forms-core").Form;
        isReady: boolean;
        submitting: boolean;
        validationDisabled: boolean;
        conditionsDisabled: boolean;
        readonly idFieldMap: {
            [key: string]: import("@kartikrao/lib-forms-core").Field;
        };
        readonly uuidFieldMap: {
            [key: string]: import("@kartikrao/lib-forms-core").Field;
        };
        readonly fieldNames: string[];
        readonly isValid: boolean;
        setSubmitting(value: boolean): void;
        readonly isSubmitting: boolean;
        readonly numPages: number;
        readonly hasNextPage: boolean;
        readonly hasPrevPage: boolean;
        readonly isSubmittable: boolean;
        nextPage: () => void;
        prevPage: () => void;
        setForm: (form: import("@kartikrao/lib-forms-core").Form) => void;
        setFieldValue: (id: string, value: any) => void;
        setFieldTouched: (id: string) => void;
        setFieldError: (id: string, error: any) => void;
    } & import("mobx").IObservableObject) => void;
    readonly availableConditionSources: {
        key: string;
        id: string;
        label: string;
        name: string;
    }[];
    readonly availableExpressions: {
        value: string;
        name: string;
    }[];
    readonly availableOperators: {
        value: string;
        name: string;
    }[];
    readonly hasCondition: boolean;
    readonly numPredicates: number;
    addCondition: (c: import("@kartikrao/lib-forms-core").ICondition) => void;
    removePredicate: (uuid: string) => void;
    addPredicate: (p: import("@kartikrao/lib-forms-core").IPredicate) => void;
    setCondition: (c: import("@kartikrao/lib-forms-core").ICondition) => void;
    addValidationRule: (key: string, rule: import("@kartikrao/lib-forms-core").GenericConstraint) => void;
    updateValidationRule: (key: string, rule: import("@kartikrao/lib-forms-core").GenericConstraint) => void;
    removeValidationRule: (key: string) => void;
    setFieldProperty: (key: string, value: any) => void;
    setComponentProperty: (key: string, value: any) => void;
    reset(): void;
    readonly showFieldEditor: boolean;
    readonly showPageEditor: boolean;
    readonly showColumnEditor: boolean;
    readonly showSectionEditor: boolean;
    setFormEditorVisible: (visible?: boolean) => void;
    setEditable: (item: import("@kartikrao/lib-forms-core").Field | import("@kartikrao/lib-forms-core").Page | import("@kartikrao/lib-forms-core").Section | import("@kartikrao/lib-forms-core").Column) => void;
    readonly asJSONForm: any;
} & import("mobx").IObservableObject>;
export declare const EditorStoreProvider: React.FC<{
    formStore: FormStoreType;
}>;
