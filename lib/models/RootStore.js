var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable, computed, action, decorate } from "mobx";
import { FormStateHelper } from "../helpers/FormStateHelper";
const { buildYup } = require("json-schema-to-yup");
import { FormFactory } from "../factory/form.factory";
import FormStore from "@kartikrao/lib-forms-core/lib/store/FormStore";
import { configure } from "mobx";
configure({ enforceActions: "always" });
class RootStore {
    constructor(data) {
        this.evaluators = {};
        this.pushField = (field, pageIndex, sectionIndex, columnIndex) => {
            console.log("Store push", pageIndex, sectionIndex, columnIndex, field);
            let fields = [].concat(this.formData.content.pages[pageIndex].sections[sectionIndex].columns[columnIndex].fields);
            fields.push(field);
            field.location.page = pageIndex;
            field.location.section = sectionIndex;
            field.location.column = columnIndex;
            field.location = { page: pageIndex, section: sectionIndex, column: columnIndex, field: fields.length - 1 };
            this.fieldMeta.locations[field.id] = field.location;
            this.formData.content.pages[pageIndex].sections[sectionIndex].columns[columnIndex].fields = fields;
            return;
        };
        this.removeField = (fieldIndex, pageIndex, sectionIndex, columnIndex) => {
            console.log("Store remove", pageIndex, sectionIndex, columnIndex, fieldIndex);
            let fields = [].concat(this.formData.content.pages[pageIndex].sections[sectionIndex].columns[columnIndex].fields);
            fields.splice(fieldIndex, 1)[0];
            this.formData.content.pages[pageIndex].sections[sectionIndex].columns[columnIndex].fields = fields;
            return;
        };
        this.moveField = (fromIndex, toIndex, pageIndex, sectionIndex, columnIndex) => {
            let fields = [].concat(this.formData.content.pages[pageIndex].sections[sectionIndex].columns[columnIndex].fields);
            let field = fields.splice(fromIndex, 1)[0];
            console.log("Store move", pageIndex, sectionIndex, columnIndex, fromIndex, "=>", toIndex, field);
            field.location.page = pageIndex;
            field.location.section = sectionIndex;
            field.location.column = columnIndex;
            field.location = { page: pageIndex, section: sectionIndex, column: columnIndex, field: toIndex };
            this.fieldMeta.locations[field.id] = field.location;
            fields.splice(toIndex, 0, field);
            this.formData.content.pages[pageIndex].sections[sectionIndex].columns[columnIndex].fields = fields;
            return;
        };
        // @action setFieldError: any;
        this.onChange = (id, value) => {
            this.values[id] = value;
            this.touched[id] = true;
            let deps = this.dependencies[id] || [];
            let self = this;
            deps.forEach((d) => {
                self.conditionals[d].result = self.evaluators[d].value(self.getFieldValue);
            });
            return;
        };
        this.onBlur = (id) => {
            this.touched[id] = true;
        };
        this.selectField = (field) => {
            this.selectedField = field;
            return;
        };
        this.updateField = (f, newState) => {
            console.log("Update Field", f, newState);
            let { page, section, column, field } = this.fieldMeta.locations[f.id];
            let current = this.formData.content.pages[page].sections[section].columns[column].fields[field];
            this.formData.content.pages[page].sections[section].columns[column].fields[field] = Object.assign(current, newState);
        };
        this.onSubmit = (values, actions) => {
            console.info("handleSubmit", values);
            // Handle dates here
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
            }, 200);
            return false;
        };
        this.validate = () => {
            let { values, currentPage, fieldMeta, validationSchema, conditionals } = this;
            let includeFields = fieldMeta.pageFields[currentPage].ids;
            // Have to deep copy otherwise
            let vFields = JSON.parse(JSON.stringify(validationSchema.properties));
            let self = this;
            // Disable validation for conditional fields
            Object.keys(conditionals).forEach((fid) => {
                const isOnThisPage = includeFields.indexOf(fid) > -1;
                const isValidateable = !!vFields[fid];
                const isFieldEnabled = self.evaluators[fid] ? self.evaluators[fid].value(self.getFieldValue) : true;
                if (isValidateable && (!isFieldEnabled || !isOnThisPage)) {
                    vFields[fid].required = false;
                }
            });
            const validator = buildYup({ type: "object", properties: vFields, errMessages: validationSchema.errMessages });
            try {
                validator.validateSync(values, { abortEarly: false, context: {} });
                this.errors = {};
            }
            catch (error) {
                let errors = {};
                error.inner.forEach((e) => {
                    errors[e.path] = e.message;
                });
                self.errors = errors;
            }
        };
        this.getFieldValue = (id) => {
            return this.values ? this.values[id] : null;
        };
        this.initialize(data);
    }
    get errorOnThisPage() {
        return Object.keys(this.errors).length > 0;
    }
    ;
    prev() {
        if (this.currentPage > 0) {
            this.currentPage = this.currentPage - 1;
        }
    }
    next() {
        if (!this.formData.formLayoutOptions.validationDisablesPaging) {
            this.currentPage = this.currentPage + 1;
        }
        else {
            if (!this.errorOnThisPage) {
                this.currentPage = this.currentPage + 1;
            }
        }
    }
    initialize(data) {
        this.formStore = new FormStore();
        this.formData = FormFactory.createForm(data, this);
        let initialState = FormStateHelper.getInitialState(this.formData, { getFieldValue: this.getFieldValue });
        this.currentPage = initialState.currentPage;
        this.numPages = initialState.numPages;
        this.ancestors = initialState.ancestors;
        this.evaluators = initialState.evaluators;
        this.touched = initialState.touched;
        this.errors = initialState.errors;
        this.dependencies = initialState.dependencies;
        this.conditionals = initialState.conditionals;
        this.fieldMeta = initialState.fieldMeta;
        this.values = initialState.values;
        this.validationSchema = initialState.validationSchema;
        this.currentPage = initialState.currentPage;
        this.numPages = initialState.numPages;
        this.confirmDirty = initialState.confirmDirty;
        console.log("STORE INITIAL STATE", initialState);
    }
}
__decorate([
    action
], RootStore.prototype, "pushField", void 0);
__decorate([
    action
], RootStore.prototype, "removeField", void 0);
__decorate([
    action
], RootStore.prototype, "moveField", void 0);
__decorate([
    action
], RootStore.prototype, "onChange", void 0);
__decorate([
    action
], RootStore.prototype, "onBlur", void 0);
__decorate([
    action
], RootStore.prototype, "selectField", void 0);
__decorate([
    action
], RootStore.prototype, "updateField", void 0);
__decorate([
    action
], RootStore.prototype, "onSubmit", void 0);
__decorate([
    action
], RootStore.prototype, "validate", void 0);
__decorate([
    computed
], RootStore.prototype, "errorOnThisPage", null);
__decorate([
    action
], RootStore.prototype, "prev", null);
__decorate([
    action
], RootStore.prototype, "next", null);
__decorate([
    action
], RootStore.prototype, "initialize", null);
decorate(RootStore, {
    ancestors: observable,
    dependencies: observable,
    errors: observable,
    conditionals: observable,
    currentPage: observable,
    fieldMeta: observable,
    values: observable,
    touched: observable,
    formData: observable,
    selectedField: observable,
    validationSchema: observable,
    numPages: observable,
    confirmDirty: observable
});
export default RootStore;
