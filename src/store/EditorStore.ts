import { action, computed, decorate, observable } from "mobx";
import { ICondition, Page, Field, Section, Column, FormStore, Factory, Predicate, IPredicate, GenericConstraint } from "@kartikrao/lib-forms-core";

export interface IEditorStoreProps {
    item?: Page|Field|Section|Column;
    formEditorVisible?: boolean;
    formStore: FormStore;
    factory: Factory;
}

class EditorStore implements IEditorStoreProps {
    field: Field;
    page: Page;
    section: Section;
    column: Column;
    formStore: FormStore;
    factory: Factory;
    formEditorVisible: boolean;

    constructor(data: IEditorStoreProps) {
        this.initialize(data);
    }

    @action initialize(data: IEditorStoreProps) {
        this.formStore = data.formStore;
        this.factory = data.factory;
        this.setEditable(data.item);
        this.formEditorVisible = false;
        return;
    }

    @computed get availableConditionSources() {
        let {formStore} = this;
        let fieldList = [];
        Object.keys(this.formStore.idFieldMap).forEach((id: string, index: number) => {
            fieldList.push({
                key: index,
                id: id,
                label:formStore.idFieldMap[id].label,
                name:formStore.idFieldMap[id].name
            });
        });
        return fieldList;
    }

    @computed get availableExpressions() {
        let expressions = [];
        Predicate.PredicateConditions.forEach((p)=>{
            expressions.push({value:p, name:p});
        });
        return expressions;
    }

    @computed get availableOperators() {
        let operators = [];
        Predicate.PredicateOperators.forEach((o) => {
            operators.push({value:o, name:o});
        })
        return operators;
    }

    @computed get hasCondition() : boolean {
        return !!this.field.condition;
    }

    @computed get numPredicates() : number {
        return this.field.condition ? this.field.condition.predicates.length : 0;
    }

    @action addCondition = (c: ICondition) => {
        this.field.setCondition(this.factory.makeCondition(c));
    }

    @action removePredicate(uuid: string) {
        let {condition} = this.field;
        let index = condition.predicates.findIndex((p: Predicate)=> {
            return p.uuid == uuid;
        });

        if (index > -1) {
            condition.predicates.splice(index, 1);
        }

        if (condition.predicates.length == 0) {
            this.field.setCondition(null);
        }
    }

    @action addPredicate = (p: IPredicate) => {
        if (!this.field.condition) {
            let condition = this.factory.makeCondition({predicates: [p]});
            this.field.setCondition(condition);
            return;
        }
        this.field.condition.addPredicates(...this.factory.makePredicates(p));
    }

    @action setCondition = (c: ICondition) => {
        this.field.setCondition(c);
    }

    @action addValidationRule = (key: string, rule: GenericConstraint) => {
        this.field.validator.rule.addConstraint(key, rule);
    }

    @action updateValidationRule = (key: string, rule: GenericConstraint) => {
        this.field.validator.rule.updateConstraint(key, rule);
    }

    @action removeValidationRule = (key: string) => {
        this.field.validator.rule.removeConstraint(key);
    }

    @action setFieldProperty = (key: string, value: any) => {
        this.field.componentProps[key] = value;
    }

    @action setComponentProperty = (key: string, value: any) => {
        this.field.componentProps[key] = value;
    }

    @action reset() {
        this.page = null;
        this.column = null;
        this.section = null;
        this.field = null;
    }

    @computed get showFieldEditor() {return !!this.field;}
    @computed get showPageEditor() {return !!this.page;}
    @computed get showColumnEditor() {return !!this.column;}
    @computed get showSectionEditor() {return !!this.section;}

    @action setFormEditorVisible(visible: boolean = false) {
        this.reset();
        this.formEditorVisible = visible;
    }

    @action setEditable = (item: Page|Section|Column|Field) => {
        this.reset();
        if (item) {
            switch(item._type) {
                case "Page" : {
                    this.page = item as Page;
                    break;
                }
                case "Section" : {
                    this.section = item as Section;
                    break;
                }
                case "Column" : {
                    this.column = item as Column;
                    break;
                }
                case "Field" : {
                    this.field = item as Field;
                    break;
                }
            }
        }
    }
}

decorate(EditorStore, {
    field: observable,
    page: observable,
    section: observable,
    column: observable,
    formEditorVisible: observable
});

export default EditorStore;