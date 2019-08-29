import { Column, Factory, Field, FormStoreType, GenericConstraint, ICondition, IPredicate, Page, Predicate, Section } from "@kartikrao/lib-forms-core";
import { toJS, observable } from "mobx";

export const createEditorStore = () => {
    const store = {
        selectedField: <Field> null,
        selectedPage : <Page> null,
        selectedSection: <Section> null,
        selectedColumn: <Column> null,
        showFormEditor: <boolean> null,
        formStore: <FormStoreType> null,
        factory: <Factory> null,
        setFormStore: function(store: FormStoreType) {
            this.formStore = store;
        },
        get availableConditionSources() : {key:string, id: string, label: string, name: string}[] {
            let fieldList = [];
            Object.keys(this.formStore.idFieldMap).forEach((id: string, index: number) => {
                fieldList.push({
                    key: index,
                    id: id,
                    label: this.formStore.idFieldMap[id].label,
                    name: this.formStore.idFieldMap[id].name
                });
            });
            return fieldList;
        },
        get availableExpressions() : {value:string, name: string}[]{
            let expressions = [];
            Predicate.PredicateConditions.forEach((p)=>{
                expressions.push({value:p, name:p});
            });
            return expressions;
        },
        get availableOperators() : {value: string, name: string}[] {
            let operators = [];
            Predicate.PredicateOperators.forEach((o) => {
                operators.push({value:o, name:o});
            })
            return operators;
        },
        get hasCondition() : boolean {
            return !!this.selectedField.condition;
        },
        get numPredicates() : number {
            return this.selectedField.condition ? this.selectedField.condition.predicates.length : 0;
        },
        addCondition : function(c: ICondition) {
            this.selectedField.setCondition(Factory.makeCondition(this.formStore, c));
        },
        removePredicate: function(uuid: string) {
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
        },
        addPredicate : function (p: IPredicate) {
            if (!this.selectedField.condition) {
                let condition = Factory.makeCondition(this.formStore, {predicates: [p]});
                this.selectedField.setCondition(condition);
                return;
            }
            this.selectedField.condition.addPredicates(...Factory.makePredicates(this.formStore, p));
        },
        setCondition : function (c: ICondition) {
            this.selectedField.setCondition(c);
        },
        addValidationRule : function(key: string, rule: GenericConstraint) {
            this.selectedField.validator.rule.addConstraint(key, rule);
        },
        updateValidationRule: function(key: string, rule: GenericConstraint) {
            this.selectedField.validator.rule.updateConstraint(key, rule);
        },
        removeValidationRule : function (key: string) {
            this.selectedField.validator.rule.removeConstraint(key);
        },
        setFieldProperty : function (key: string, value: any) {
            this.selectedField.componentProps[key] = value;
        },
        setComponentProperty : function (key: string, value: any) {
            this.selectedField.componentProps[key] = value;
        },
        reset() {
            this.selectedPage = null;
            this.selectedColumn = null;
            this.selectedSection = null;
            this.selectedField = null;
        },
        get showFieldEditor()  : boolean {return !!this.selectedField;},
        get showPageEditor()   : boolean {return !!this.selectedPage;},
        get showColumnEditor() : boolean {return !!this.selectedColumn;},
        get showSectionEditor(): boolean {return !!this.selectedSection;},
        setFormEditorVisible: function (visible: boolean = false) {
            this.reset();
            this.showFormEditor = visible;
        },
        setEditable : function (item: Page|Section|Column|Field) {
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
        },
        get asJSONForm() : any {
            return toJS(this.formStore.form, {exportMapsAsObjects: true});
        }
    };
    return observable(store);
}

export type EditorStoreType = ReturnType<typeof createEditorStore>;