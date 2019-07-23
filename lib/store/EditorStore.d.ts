import { ICondition, Page, Field, Section, Column, FormStore, Factory, IPredicate, GenericConstraint, IFormProps, Form } from "@kartikrao/lib-forms-core";
export interface IEditorStoreProps {
    item?: Page | Field | Section | Column;
    showFormEditor?: boolean;
    formStore: FormStore;
    factory: Factory;
}
export declare class EditorStore implements IEditorStoreProps {
    selectedField: Field;
    selectedPage: Page;
    selectedSection: Section;
    selectedColumn: Column;
    showFormEditor: boolean;
    formData: Form;
    formStore: FormStore;
    factory: Factory;
    constructor(data: IFormProps);
    initialize(data: IFormProps): void;
    readonly availableConditionSources: any[];
    readonly availableExpressions: any[];
    readonly availableOperators: any[];
    readonly hasCondition: boolean;
    readonly numPredicates: number;
    addCondition: (c: ICondition) => void;
    removePredicate(uuid: string): void;
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
    setFormEditorVisible(visible?: boolean): void;
    setEditable: (item: Page | Field | Section | Column) => void;
    readonly asJSONForm: Form;
}
