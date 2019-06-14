var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, computed, decorate, observable } from "mobx";
import Predicate from "@kartikrao/lib-forms-core/lib/models/condition.predicate";
class EditorStore {
    constructor(data) {
        this.addCondition = (c) => {
            this.field.setCondition(this.factory.makeCondition(c));
        };
        this.addPredicate = (p) => {
            if (!this.field.condition) {
                let condition = this.factory.makeCondition({ predicates: [p] });
                this.field.setCondition(condition);
                return;
            }
            this.field.condition.addPredicates(...this.factory.makePredicates(p));
        };
        this.setCondition = (c) => {
            this.field.setCondition(c);
        };
        this.addValidationRule = (key, rule) => {
            this.field.validator.rule.addConstraint(key, rule);
        };
        this.updateValidationRule = (key, rule) => {
            this.field.validator.rule.updateConstraint(key, rule);
        };
        this.removeValidationRule = (key) => {
            this.field.validator.rule.removeConstraint(key);
        };
        this.setFieldProperty = (key, value) => {
            this.field.componentProps[key] = value;
        };
        this.setComponentProperty = (key, value) => {
            this.field.componentProps[key] = value;
        };
        this.setEditable = (item) => {
            this.reset();
            if (item) {
                switch (item._type) {
                    case "Page": {
                        this.page = item;
                        break;
                    }
                    case "Section": {
                        this.section = item;
                        break;
                    }
                    case "Column": {
                        this.column = item;
                        break;
                    }
                    case "Field": {
                        this.field = item;
                        break;
                    }
                }
            }
        };
        this.initialize(data);
    }
    initialize(data) {
        this.formStore = data.formStore;
        this.factory = data.factory;
        this.setEditable(data.item);
        this.formEditorVisible = false;
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
        return !!this.field.condition;
    }
    get numPredicates() {
        return this.field.condition ? this.field.condition.predicates.length : 0;
    }
    removePredicate(uuid) {
        let { condition } = this.field;
        let index = condition.predicates.findIndex((p) => {
            return p.uuid == uuid;
        });
        if (index > -1) {
            condition.predicates.splice(index, 1);
        }
        if (condition.predicates.length == 0) {
            this.field.setCondition(null);
        }
    }
    reset() {
        this.page = null;
        this.column = null;
        this.section = null;
        this.field = null;
    }
    get showFieldEditor() { return !!this.field; }
    get showPageEditor() { return !!this.page; }
    get showColumnEditor() { return !!this.column; }
    get showSectionEditor() { return !!this.section; }
    setFormEditorVisible(visible = false) {
        this.reset();
        this.formEditorVisible = visible;
    }
}
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
decorate(EditorStore, {
    field: observable,
    page: observable,
    section: observable,
    column: observable,
    formEditorVisible: observable
});
export default EditorStore;
