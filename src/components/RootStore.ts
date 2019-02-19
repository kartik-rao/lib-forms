import { observable, computed, action, decorate } from "mobx";
import { IField } from "@adinfinity/ai-core-forms";
import {FormStateHelper} from "../helpers/FormStateHelper";
const { buildYup } = require("json-schema-to-yup");
import Yup from "yup";
import {FormFactory} from "../factory/form.factory";


import {configure, autorun} from "mobx";
configure({enforceActions: "always"});

export class RootStore {
    ancestors: any;
    dependencies: any;
    conditionals: any;
    evaluators: any;
    currentPage : number;
    fieldMeta: any;
    values: any;
    touched: any;
    formData: any;
    selectedField: IField;
    validationSchema: any;
    numPages: number;
    confirmDirty: boolean;

    @action setFieldValue: any;
    @action setFieldError: any;


    @action onchange(id: string, value: any) {
        this.values[id] = value;
        let deps = this.dependencies[id] || [];
        let self = this;
        deps.forEach((d) => {
            self.conditionals[d].result =  self.evaluators[d].value(self.getFieldValue)
        });

        return;
    }

    @action onBlur(id: string) {
        this.touched[id] = true;
    }

    @action selectField = (field: IField) => {
        this.selectedField = field;
        return;
    }

    @action updateField = (f: IField, newState: any) => {
        console.log("Update Field", f, newState);
        let {page, section, column, field} = this.fieldMeta.locations[f.id];
        let current = this.formData.content.pages[page].sections[section].columns[column].fields[field]
        this.formData.content.pages[page].sections[section].columns[column].fields[field] = Object.assign(current, newState)
    }

    @action onSubmit(values: any, actions: any) {
        console.info("handleSubmit", values);
        // Handle dates here
        setTimeout(()=> {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
        }, 200);
        return false;
    }

    @computed get validationErrors() : any {
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
            return {};
        } catch (error) {
            let errors = {};
            error.inner.forEach((e)=>{
                errors[e.path] = e.message;
                self.setFieldError(e.path, e.message);
            });
            return errors;
        }
    }

    @computed get errorOnThisPage() : boolean {
        let _errors = this.validationErrors();
        return Object.keys(_errors).length > 0;
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
        return this.values[id];
    }

    constructor(data: any) {
        this.formData = FormFactory.createForm(data);
        let {ancestors, dependencies, conditionals, fieldMeta, values, validationSchema, currentPage, numPages, confirmDirty} = FormStateHelper.getInitialState(this.formData, {}, this.getFieldValue)
        this.ancestors = ancestors;
        this.dependencies = dependencies;
        this.conditionals = conditionals;
        this.fieldMeta = fieldMeta;
        this.values = values;
        this.validationSchema = validationSchema;
        this.currentPage = currentPage;
        this.numPages = numPages;
        this.confirmDirty = confirmDirty;
        autorun(() => console.log("Store updated", this));
    }
}