import { action, computed, decorate, observable, toJS, configure } from "mobx";
import { ICondition, Page, Field, Section, Column, FormStore, Factory, Predicate, IPredicate, GenericConstraint, IFormProps, Form } from "@kartikrao/lib-forms-core";

configure({enforceActions: "always"});

export interface IEditorStoreProps {
    item?: Page|Field|Section|Column;
    showFormEditor?: boolean;
    formStore: FormStore;
    factory: Factory;
}

export class EditorStore implements IEditorStoreProps {
    @observable selectedField: Field;
    @observable selectedPage: Page;
    @observable selectedSection: Section;
    @observable selectedColumn: Column;
    @observable showFormEditor: boolean;
    @observable formData: Form;
    formStore: FormStore;
    factory: Factory;

    constructor(data: IFormProps) {
        this.initialize(data);
    }

    @action initialize(data: IFormProps) {
        this.formStore = new FormStore();
        this.factory = new Factory(this.formStore);
        this.formData = this.factory.makeForm(data);
        this.setEditable(null);
        this.showFormEditor = false;
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
        return !!this.selectedField.condition;
    }

    @computed get numPredicates() : number {
        return this.selectedField.condition ? this.selectedField.condition.predicates.length : 0;
    }

    @action addCondition = (c: ICondition) => {
        this.selectedField.setCondition(this.factory.makeCondition(c));
    }

    @action removePredicate(uuid: string) {
        let {condition} = this.selectedField;
        let index = condition.predicates.findIndex((p: Predicate)=> {
            return p.uuid == uuid;
        });

        if (index > -1) {
            condition.predicates.splice(index, 1);
        }

        if (condition.predicates.length == 0) {
            this.selectedField.setCondition(null);
        }
    }

    @action addPredicate = (p: IPredicate) => {
        if (!this.selectedField.condition) {
            let condition = this.factory.makeCondition({predicates: [p]});
            this.selectedField.setCondition(condition);
            return;
        }
        this.selectedField.condition.addPredicates(...this.factory.makePredicates(p));
    }

    @action setCondition = (c: ICondition) => {
        this.selectedField.setCondition(c);
    }

    @action addValidationRule = (key: string, rule: GenericConstraint) => {
        this.selectedField.validator.rule.addConstraint(key, rule);
    }

    @action updateValidationRule = (key: string, rule: GenericConstraint) => {
        this.selectedField.validator.rule.updateConstraint(key, rule);
    }

    @action removeValidationRule = (key: string) => {
        this.selectedField.validator.rule.removeConstraint(key);
    }

    @action setFieldProperty = (key: string, value: any) => {
        this.selectedField.componentProps[key] = value;
    }

    @action setComponentProperty = (key: string, value: any) => {
        this.selectedField.componentProps[key] = value;
    }

    @action reset() {
        this.selectedPage = null;
        this.selectedColumn = null;
        this.selectedSection = null;
        this.selectedField = null;
    }

    @computed get showFieldEditor() {return !!this.selectedField;}
    @computed get showPageEditor() {return !!this.selectedPage;}
    @computed get showColumnEditor() {return !!this.selectedColumn;}
    @computed get showSectionEditor() {return !!this.selectedSection;}

    @action setFormEditorVisible(visible: boolean = false) {
        this.reset();
        this.showFormEditor = visible;
    }

    @action setEditable = (item: Page|Section|Column|Field) => {
        this.reset();
        if (item) {
            switch(item._type) {
                case "Page" : {
                    this.selectedPage = item as Page;
                    break;
                }
                case "Section" : {
                    this.selectedSection = item as Section;
                    break;
                }
                case "Column" : {
                    this.selectedColumn = item as Column;
                    break;
                }
                case "Field" : {
                    this.selectedField = item as Field;
                    break;
                }
            }
        }
    }

    @computed get asJSONForm() {
        return toJS(this.formStore.form, {exportMapsAsObjects: true});
    }
}