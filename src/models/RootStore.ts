import { observable, computed, action, decorate, reaction } from "mobx";
import Field from "@kartikrao/lib-forms-core/lib/models/field";
import {IFormProps}  from "@kartikrao/lib-forms-core";
import {FormStateHelper} from "../helpers/FormStateHelper";
const { buildYup } = require("json-schema-to-yup");
import Yup from "yup";
import {FormFactory} from "../factory/form.factory";
import FormStore from "@kartikrao/lib-forms-core/lib/store/FormStore";
import Form from "@kartikrao/lib-forms-core/lib/models/form";

import {configure, autorun} from "mobx";
configure({enforceActions: "always"});

class RootStore {
    formStore: FormStore;
    ancestors: any;
    dependencies: any;
    conditionals: any;
    errors: any;
    evaluators: any = {};
    currentPage : number;
    fieldMeta: any;
    values: any;
    touched: any;
    formData: Form;
    selectedField: Field;
    validationSchema: any;
    numPages: number;
    confirmDirty: boolean;

    @action pushField = (field: Field, pageIndex: number, sectionIndex: number, columnIndex: number) => {
        console.log("Store push", pageIndex, sectionIndex, columnIndex, field);
        let fields = [].concat(this.formData.content.pages[pageIndex].sections[sectionIndex].columns[columnIndex].fields)
        fields.push(field);
        field.location.page = pageIndex;
        field.location.section = sectionIndex;
        field.location.column = columnIndex;
        field.location =  {page: pageIndex, section: sectionIndex, column: columnIndex, field: fields.length -1};
        this.fieldMeta.locations[field.id] = field.location;
        this.formData.content.pages[pageIndex].sections[sectionIndex].columns[columnIndex].fields = fields;
        return;
    }

    @action removeField = (fieldIndex: number, pageIndex: number, sectionIndex: number, columnIndex: number) => {
        console.log("Store remove", pageIndex, sectionIndex, columnIndex, fieldIndex);
        let fields = [].concat(this.formData.content.pages[pageIndex].sections[sectionIndex].columns[columnIndex].fields)
        fields.splice(fieldIndex, 1)[0];
        this.formData.content.pages[pageIndex].sections[sectionIndex].columns[columnIndex].fields = fields;
        return;
    }

    @action moveField = (fromIndex: number, toIndex: number, pageIndex, sectionIndex, columnIndex) => {
        let fields = [].concat(this.formData.content.pages[pageIndex].sections[sectionIndex].columns[columnIndex].fields)
        let field = fields.splice(fromIndex, 1)[0]
        console.log("Store move", pageIndex, sectionIndex, columnIndex, fromIndex, "=>", toIndex, field);
        field.location.page = pageIndex;
        field.location.section = sectionIndex;
        field.location.column = columnIndex;
        field.location =  {page: pageIndex, section: sectionIndex, column: columnIndex, field: toIndex};
        this.fieldMeta.locations[field.id] = field.location;
        fields.splice(toIndex, 0, field)
        this.formData.content.pages[pageIndex].sections[sectionIndex].columns[columnIndex].fields = fields;
        return;
    }

    // @action setFieldError: any;
    @action onChange = (id: string, value: any) => {
        this.values[id] = value;
        this.touched[id] = true;
        let deps = this.dependencies[id] || [];
        let self = this;
        deps.forEach((d) => {
            self.conditionals[d].result =  self.evaluators[d].value(self.getFieldValue)
        });

        return;
    }

    @action onBlur = (id: string) => {
        this.touched[id] = true;
    }

    @action selectField = (field: Field) => {
        this.selectedField = field;
        return;
    }

    @action updateField = (f: Field, newState: any) => {
        console.log("Update Field", f, newState);
        let {page, section, column, field} = this.fieldMeta.locations[f.id];
        let current = this.formData.content.pages[page].sections[section].columns[column].fields[field]
        this.formData.content.pages[page].sections[section].columns[column].fields[field] = Object.assign(current, newState)
    }

    @action onSubmit = (values: any, actions: any) => {
        console.info("handleSubmit", values);
        // Handle dates here
        setTimeout(()=> {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
        }, 200);
        return false;
    }

    @action validate = () => {
        let {values, currentPage, fieldMeta, validationSchema, conditionals} = this;
        let includeFields = fieldMeta.pageFields[currentPage].ids;

        // Have to deep copy otherwise
        let vFields: any = JSON.parse(JSON.stringify(validationSchema.properties));

        let self = this;

        // Disable validation for conditional fields
        Object.keys(conditionals).forEach((fid) => {
            const isOnThisPage = includeFields.indexOf(fid) > -1;
            const isValidateable = !!vFields[fid];
            const isFieldEnabled = self.evaluators[fid] ? self.evaluators[fid].value(self.getFieldValue) : true;
            if(isValidateable && (!isFieldEnabled || !isOnThisPage)) {
                vFields[fid].required = false;
            }
        });

        const validator: Yup.ObjectSchema<any> = buildYup({type:"object",  properties: vFields, errMessages:validationSchema.errMessages});
        try {
            validator.validateSync(values, { abortEarly: false, context: {} })
            this.errors = {};
        } catch (error) {
            let errors = {};
            error.inner.forEach((e)=>{
                errors[e.path] = e.message;
            });

            self.errors = errors;
        }

    }

    @computed get errorOnThisPage() : boolean {
        return Object.keys(this.errors).length > 0;
    };

    @action prev() {
        if (this.currentPage > 0) {
            this.currentPage = this.currentPage - 1;
        }
    }

    @action next() {
        if (!this.formData.formLayoutOptions.validationDisablesPaging) {
            this.currentPage = this.currentPage + 1;
        } else {
            if (!this.errorOnThisPage) {
                this.currentPage = this.currentPage + 1;
            }
        }
    }

    getFieldValue = (id: string) => {
        return this.values ? this.values[id] : null;
    }

    @action initialize(data: IFormProps) {
        this.formStore = new FormStore();
        this.formData = FormFactory.createForm(data, this);
        let initialState = FormStateHelper.getInitialState(this.formData, {getFieldValue: this.getFieldValue});
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
        console.log("STORE INITIAL STATE", initialState)
    }

    constructor(data: IFormProps) {
        this.initialize(data);
    }
}

decorate(RootStore, {
    ancestors: observable,
    dependencies: observable,
    errors: observable,
    conditionals: observable,
    currentPage : observable,
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