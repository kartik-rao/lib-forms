import { Column, Field, Form, GenericConstraint, ICondition, IPredicate, Page, Section } from "@kartikrao/lib-forms-core";
export declare const createEditorStore: () => {
    selectedField: Field;
    selectedPage: Page;
    selectedSection: Section;
    selectedColumn: Column;
    showFormEditor: boolean;
    formStore: {
        errors: import("mobx").IObservableObject;
        values: import("mobx").IObservableObject;
        touched: import("mobx").IObservableObject;
        currentPage: import("mobx").IObservableValue<number>;
        debug: import("mobx").IObservableValue<boolean>;
        form: Form;
        isReady: import("mobx").IObservableValue<boolean>;
        submitting: import("mobx").IObservableValue<boolean>;
        validationDisabled: import("mobx").IObservableValue<boolean>;
        conditionsDisabled: import("mobx").IObservableValue<boolean>;
        readonly idFieldMap: {
            [key: string]: Field;
        };
        readonly uuidFieldMap: {
            [key: string]: Field;
        };
        readonly fieldNames: string[];
        readonly isValid: boolean;
        setSubmitting(value: boolean): void;
        readonly isSubmitting: boolean;
        readonly numPages: number;
        nextPage: () => void;
        prevPage: () => void;
        setForm: (form: Form) => void;
        setFieldValue: (id: string, value: any) => void;
        setFieldTouched: (id: string) => void;
        setFieldError: (id: string, error: any) => void;
    };
    setFormStore: (store: {
        errors: import("mobx").IObservableObject;
        values: import("mobx").IObservableObject;
        touched: import("mobx").IObservableObject;
        currentPage: import("mobx").IObservableValue<number>;
        debug: import("mobx").IObservableValue<boolean>;
        form: Form;
        isReady: import("mobx").IObservableValue<boolean>;
        submitting: import("mobx").IObservableValue<boolean>;
        validationDisabled: import("mobx").IObservableValue<boolean>;
        conditionsDisabled: import("mobx").IObservableValue<boolean>;
        readonly idFieldMap: {
            [key: string]: Field;
        };
        readonly uuidFieldMap: {
            [key: string]: Field;
        };
        readonly fieldNames: string[];
        readonly isValid: boolean;
        setSubmitting(value: boolean): void;
        readonly isSubmitting: boolean;
        readonly numPages: number;
        nextPage: () => void;
        prevPage: () => void;
        setForm: (form: Form) => void;
        setFieldValue: (id: string, value: any) => void;
        setFieldTouched: (id: string) => void;
        setFieldError: (id: string, error: any) => void;
    }) => void;
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
    addCondition: (c: ICondition) => void;
    removePredicate: (uuid: string) => void;
    addPredicate: (p: IPredicate) => void;
    setCondition: (c: ICondition) => void;
    addValidationRule: (key: string, rule: GenericConstraint) => void;
    updateValidationRule: (key: string, rule: GenericConstraint) => void;
    removeValidationRule: (key: string) => void;
    setFieldProperty: (key: string, value: any) => void;
    setComponentProperty: (key: string, value: any) => void;
    reset(): void;
    readonly showFieldEditor: boolean;
    readonly showPageEditor: boolean;
    readonly showColumnEditor: boolean;
    readonly showSectionEditor: boolean;
    setFormEditorVisible: (visible?: boolean) => void;
    setEditable: (item: Field | Page | Section | Column) => void;
    readonly asJSONForm: any;
};
export declare type EditorStoreType = ReturnType<typeof createEditorStore>;
