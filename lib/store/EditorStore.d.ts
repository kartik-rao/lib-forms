import { ICondition } from "@kartikrao/lib-forms-core/lib/models/condition";
import { IPredicate } from "@kartikrao/lib-forms-core/lib/models/condition.predicate";
import { Factory } from "@kartikrao/lib-forms-core/lib/models/factory";
import Field from "@kartikrao/lib-forms-core/lib/models/field";
import { GenericConstraint } from "@kartikrao/lib-forms-core/lib/models/validation.constraints";
import FormStore from "@kartikrao/lib-forms-core/lib/store/FormStore";
import Page from "@kartikrao/lib-forms-core/lib/models/page";
import Section from "@kartikrao/lib-forms-core/lib/models/section";
import Column from "@kartikrao/lib-forms-core/lib/models/column";
export interface IEditorStoreProps {
    item?: Page | Field | Section | Column;
    formEditorVisible?: boolean;
    formStore: FormStore;
    factory: Factory;
}
declare class EditorStore implements IEditorStoreProps {
    field: Field;
    page: Page;
    section: Section;
    column: Column;
    formStore: FormStore;
    factory: Factory;
    formEditorVisible: boolean;
    constructor(data: IEditorStoreProps);
    initialize(data: IEditorStoreProps): void;
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
}
export default EditorStore;
