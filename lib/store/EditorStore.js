var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Factory, FormStore, Predicate } from "@kartikrao/lib-forms-core";
import { action, computed, configure, observable, toJS } from "mobx";
configure({ enforceActions: "always" });
export class EditorStore {
    constructor(data) {
        this.addCondition = (c) => {
            this.selectedField.setCondition(this.factory.makeCondition(c));
        };
        this.addPredicate = (p) => {
            if (!this.selectedField.condition) {
                let condition = this.factory.makeCondition({ predicates: [p] });
                this.selectedField.setCondition(condition);
                return;
            }
            this.selectedField.condition.addPredicates(...this.factory.makePredicates(p));
        };
        this.setCondition = (c) => {
            this.selectedField.setCondition(c);
        };
        this.addValidationRule = (key, rule) => {
            this.selectedField.validator.rule.addConstraint(key, rule);
        };
        this.updateValidationRule = (key, rule) => {
            this.selectedField.validator.rule.updateConstraint(key, rule);
        };
        this.removeValidationRule = (key) => {
            this.selectedField.validator.rule.removeConstraint(key);
        };
        this.setFieldProperty = (key, value) => {
            this.selectedField.componentProps[key] = value;
        };
        this.setComponentProperty = (key, value) => {
            this.selectedField.componentProps[key] = value;
        };
        this.setEditable = (item) => {
            this.reset();
            if (item) {
                switch (item._type) {
                    case "Page": {
                        this.selectedPage = item;
                        break;
                    }
                    case "Section": {
                        this.selectedSection = item;
                        break;
                    }
                    case "Column": {
                        this.selectedColumn = item;
                        break;
                    }
                    case "Field": {
                        this.selectedField = item;
                        break;
                    }
                }
            }
        };
        this.initialize(data);
    }
    initialize(data) {
        this.formStore = new FormStore();
        this.factory = new Factory(this.formStore);
        this.formData = this.factory.makeForm(data);
        this.setEditable(null);
        this.showFormEditor = false;
        return;
    }
    get availableConditionSources() {
        let { formStore } = this;
        let fieldList = [];
        Object.keys(this.formStore.idFieldMap).forEach((id, index) => {
            fieldList.push({
                key: index,
                id: id,
                label: formStore.idFieldMap[id].label,
                name: formStore.idFieldMap[id].name
            });
        });
        return fieldList;
    }
    get availableExpressions() {
        let expressions = [];
        Predicate.PredicateConditions.forEach((p) => {
            expressions.push({ value: p, name: p });
        });
        return expressions;
    }
    get availableOperators() {
        let operators = [];
        Predicate.PredicateOperators.forEach((o) => {
            operators.push({ value: o, name: o });
        });
        return operators;
    }
    get hasCondition() {
        return !!this.selectedField.condition;
    }
    get numPredicates() {
        return this.selectedField.condition ? this.selectedField.condition.predicates.length : 0;
    }
    removePredicate(uuid) {
        let { condition } = this.selectedField;
        let index = condition.predicates.findIndex((p) => {
            return p.uuid == uuid;
        });
        if (index > -1) {
            condition.predicates.splice(index, 1);
        }
        if (condition.predicates.length == 0) {
            this.selectedField.setCondition(null);
        }
    }
    reset() {
        this.selectedPage = null;
        this.selectedColumn = null;
        this.selectedSection = null;
        this.selectedField = null;
    }
    get showFieldEditor() { return !!this.selectedField; }
    get showPageEditor() { return !!this.selectedPage; }
    get showColumnEditor() { return !!this.selectedColumn; }
    get showSectionEditor() { return !!this.selectedSection; }
    setFormEditorVisible(visible = false) {
        this.reset();
        this.showFormEditor = visible;
    }
    get asJSONForm() {
        return toJS(this.formStore.form, { exportMapsAsObjects: true });
    }
}
__decorate([
    observable
], EditorStore.prototype, "selectedField", void 0);
__decorate([
    observable
], EditorStore.prototype, "selectedPage", void 0);
__decorate([
    observable
], EditorStore.prototype, "selectedSection", void 0);
__decorate([
    observable
], EditorStore.prototype, "selectedColumn", void 0);
__decorate([
    observable
], EditorStore.prototype, "showFormEditor", void 0);
__decorate([
    observable
], EditorStore.prototype, "formData", void 0);
__decorate([
    action
], EditorStore.prototype, "initialize", null);
__decorate([
    computed
], EditorStore.prototype, "availableConditionSources", null);
__decorate([
    computed
], EditorStore.prototype, "availableExpressions", null);
__decorate([
    computed
], EditorStore.prototype, "availableOperators", null);
__decorate([
    computed
], EditorStore.prototype, "hasCondition", null);
__decorate([
    computed
], EditorStore.prototype, "numPredicates", null);
__decorate([
    action
], EditorStore.prototype, "addCondition", void 0);
__decorate([
    action
], EditorStore.prototype, "removePredicate", null);
__decorate([
    action
], EditorStore.prototype, "addPredicate", void 0);
__decorate([
    action
], EditorStore.prototype, "setCondition", void 0);
__decorate([
    action
], EditorStore.prototype, "addValidationRule", void 0);
__decorate([
    action
], EditorStore.prototype, "updateValidationRule", void 0);
__decorate([
    action
], EditorStore.prototype, "removeValidationRule", void 0);
__decorate([
    action
], EditorStore.prototype, "setFieldProperty", void 0);
__decorate([
    action
], EditorStore.prototype, "setComponentProperty", void 0);
__decorate([
    action
], EditorStore.prototype, "reset", null);
__decorate([
    computed
], EditorStore.prototype, "showFieldEditor", null);
__decorate([
    computed
], EditorStore.prototype, "showPageEditor", null);
__decorate([
    computed
], EditorStore.prototype, "showColumnEditor", null);
__decorate([
    computed
], EditorStore.prototype, "showSectionEditor", null);
__decorate([
    action
], EditorStore.prototype, "setFormEditorVisible", null);
__decorate([
    action
], EditorStore.prototype, "setEditable", void 0);
__decorate([
    computed
], EditorStore.prototype, "asJSONForm", null);
