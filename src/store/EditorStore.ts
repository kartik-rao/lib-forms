import { Column, Factory, Field, FormStoreType, GenericConstraint, ICondition, IFormProps, IPredicate, Page, Predicate, Section } from "@kartikrao/lib-forms-core";
import { observable, toJS } from "mobx";

export const createEditorStore = () => {
    let UndoStack = [];
    const store = {
        selectedField: <Field> null,
        selectedPage : <Page> null,
        selectedSection: <Section> null,
        selectedColumn: <Column> null,
        showFormEditor: <boolean> null,
        showPalette: <boolean> true,
        formStore: <FormStoreType> null,
        factory: <Factory> null,
        isDirty : <boolean> false,
        changelog: [] as string[],
        setFormStore: function(store: FormStoreType) {
            this.isDirty = false;
            this.formStore = store;
        },
        resetUndoState: function() {
            UndoStack.splice(0, UndoStack.length);
        },
        pushUndoState : function(change: string, markDirty: boolean = true) {
            if (this.formStore.form) {
                this.changelog.unshift(change);
                UndoStack.unshift({value: this.formStore.form.asPlainObject, change: change});
            }
            if (markDirty) {
                this.isDirty = true;
            }
            console.log("PUSH <", change, "> | dirty",this.isDirty);
        },
        popUndoState : function() {
            if (this.formStore.form && UndoStack.length > 0) {
                let {change, value} = UndoStack.shift();
                this.changelog.shift();
                this.formStore.setForm(Factory.makeForm(this.formStore, value))
                if (UndoStack.length == 0) {
                    this.isDirty = false;
                }
                return change;
            }
            return null;
        },
        deletePage : function(index: number) {
            this.pushUndoState(`Page ${index+1} (${this.formStore.form.content.pages[index].title || this.formStore.form.content.pages[index].name}) deleted.`);
            this.formStore.form.removePage(index);
            this.isDirty = true;
        },
        deleteSection : function(pageIndex: number, index: number) {
            this.pushUndoState(`Section ${index+1} of Page ${pageIndex+1} deleted.`);
            this.formStore.form.content.pages[pageIndex].sections.splice(index, 1);
            this.isDirty = true;
        },
        deleteColumn : function(pageIndex: number, sectionIndex: number, index: number) {
            this.pushUndoState(`Column ${index+1} of Section ${sectionIndex+1} in Page [${pageIndex+1}] deleted.`);
            this.formStore.form.content.pages[pageIndex].sections[sectionIndex].columns.splice(index, 1);
            this.isDirty = true;
        },
        deleteField : function(pageIndex: number, sectionIndex: number, columnIndex: number, index: number) {
            let f = this.formStore.form.content.pages[pageIndex].sections[sectionIndex].columns[columnIndex].fields[index];
            this.pushUndoState(`Field ${f.id} (${f.label||f.name}) deleted.`);
            this.formStore.form.content.pages[pageIndex].sections[sectionIndex].columns[columnIndex].fields.splice(index, 1);
            this.isDirty = true;
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
        get asJSONForm() : IFormProps {
            return toJS(this.formStore.form.asPlainObject, {exportMapsAsObjects: true, recurseEverything: true});
        }
    };
    return observable(store);
}

export type EditorStoreType = ReturnType<typeof createEditorStore>;