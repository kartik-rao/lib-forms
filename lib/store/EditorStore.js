import { Factory, Predicate } from "@kartikrao/lib-forms-core";
import { toJS } from "mobx";
export const createEditorStore = () => {
    const store = {
        selectedField: null,
        selectedPage: null,
        selectedSection: null,
        selectedColumn: null,
        showFormEditor: null,
        formStore: null,
        factory: null,
        setFormStore: function (store) {
            this.formStore = store;
        },
        get availableConditionSources() {
            let fieldList = [];
            Object.keys(this.formStore.idFieldMap).forEach((id, index) => {
                fieldList.push({
                    key: index,
                    id: id,
                    label: this.formStore.idFieldMap[id].label,
                    name: this.formStore.idFieldMap[id].name
                });
            });
            return fieldList;
        },
        get availableExpressions() {
            let expressions = [];
            Predicate.PredicateConditions.forEach((p) => {
                expressions.push({ value: p, name: p });
            });
            return expressions;
        },
        get availableOperators() {
            let operators = [];
            Predicate.PredicateOperators.forEach((o) => {
                operators.push({ value: o, name: o });
            });
            return operators;
        },
        get hasCondition() {
            return !!this.selectedField.condition;
        },
        get numPredicates() {
            return this.selectedField.condition ? this.selectedField.condition.predicates.length : 0;
        },
        addCondition: function (c) {
            this.selectedField.setCondition(Factory.makeCondition(this.formStore, c));
        },
        removePredicate: function (uuid) {
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
        },
        addPredicate: function (p) {
            if (!this.selectedField.condition) {
                let condition = Factory.makeCondition(this.formStore, { predicates: [p] });
                this.selectedField.setCondition(condition);
                return;
            }
            this.selectedField.condition.addPredicates(...Factory.makePredicates(this.formStore, p));
        },
        setCondition: function (c) {
            this.selectedField.setCondition(c);
        },
        addValidationRule: function (key, rule) {
            this.selectedField.validator.rule.addConstraint(key, rule);
        },
        updateValidationRule: function (key, rule) {
            this.selectedField.validator.rule.updateConstraint(key, rule);
        },
        removeValidationRule: function (key) {
            this.selectedField.validator.rule.removeConstraint(key);
        },
        setFieldProperty: function (key, value) {
            this.selectedField.componentProps[key] = value;
        },
        setComponentProperty: function (key, value) {
            this.selectedField.componentProps[key] = value;
        },
        reset() {
            this.selectedPage = null;
            this.selectedColumn = null;
            this.selectedSection = null;
            this.selectedField = null;
        },
        get showFieldEditor() { return !!this.selectedField; },
        get showPageEditor() { return !!this.selectedPage; },
        get showColumnEditor() { return !!this.selectedColumn; },
        get showSectionEditor() { return !!this.selectedSection; },
        setFormEditorVisible: function (visible = false) {
            this.reset();
            this.showFormEditor = visible;
        },
        setEditable: function (item) {
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
        },
        get asJSONForm() {
            return toJS(this.formStore.form, { exportMapsAsObjects: true });
        }
    };
    return store;
};
