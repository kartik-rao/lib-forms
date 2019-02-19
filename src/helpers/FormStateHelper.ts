import {IField} from "@adinfinity/ai-core-forms";
const { buildYup } = require("json-schema-to-yup");

export class FormStateHelper {
    static getInitialState(formData: any,  decorators: any) {
        let state = {
            currentPage: (formData.content && formData.content.pages.length > 0 ? 0 : 0) as number,
            numPages: (formData.content && formData.content.pages.length > 0 ? formData.content.pages.length : 0) as number,
            confirmDirty: false,
            fieldMeta: {
                locations: {} as any,
                allFields: [] as IField[],
                pageFields : {} as any
            },
            values: {},
            touched: {},
            errors: {},
            validationSchema: null
        };

        let validation = {
            validate: false,
            schema: <any>{},
            messages: <any>{}
        }
        // Store page metadata
        formData.content.pages.forEach((page, pi) => {
            page.sections.forEach((section, si) => {
                section.columns.forEach((column, ci) => {
                    column.fields.forEach((field, fi)=> {
                        state.fieldMeta.allFields.push(field);
                        state.values[field.id] = undefined;
                        state.touched[field.id] = false;
                        state.errors[field.id] = null;
                        FormStateHelper.registerValidations(validation, field);
                        field.location = field.location = {page: pi, section: si, column: ci, field: fi};
                        state.fieldMeta.locations[field.id] = {page: pi, section: si, column: ci, field: fi}
                        state.fieldMeta.pageFields[pi] = state.fieldMeta.pageFields[pi] ? state.fieldMeta.pageFields[pi] : {names:[], ids:[]};
                        state.fieldMeta.pageFields[pi].names.push(field.name);
                        state.fieldMeta.pageFields[pi].ids.push(field.id);
                    });
                });
            });
        });
        if (validation.validate) {
            let schema = {type:"object", properties:validation.schema};
            state.validationSchema = {...schema, errMessages: validation.messages}
        }

        return FormStateHelper.registerFieldConditions(state.fieldMeta.allFields, state, decorators);
    }

    static registerValidations(validation: any, field: IField) {
        let {fieldOptions} = field;
        if (fieldOptions && fieldOptions.type && fieldOptions.rules) {
            validation.validate = true;
            validation.schema[field.name] = {type: fieldOptions.type}
            if (fieldOptions.format) {
                validation.schema[field.name].format = fieldOptions.format;
            }
            field.fieldOptions.rules.forEach((rule) => {
                validation.messages[field.name] = validation.messages[field.name] ? validation.messages[field.name] : {};
                validation.schema[field.name][rule.name] = rule.value;
                validation.messages[field.name][rule.name] = rule.message;
            });
        }
    }

    static registerFieldConditions(fields: IField[], state: any,  decorators: any) : any {
        state = {...state, evaluators: {}, dependencies: {}, conditionals: {}, ancestors: {}};
        fields.forEach((f: IField) => {
            if(f.condition) {
                state.evaluators[`${f.id}`] = f.condition;
                state.conditionals[`${f.id}`] = {result: f.condition.value(decorators.getFieldValue)}
                if (f.condition.ancestors) {
                    state.ancestors[f.id] = f.condition.ancestors;
                }
            }
        });
        Object.keys(state.ancestors).forEach((f) => {
            let ancestors = state.ancestors[f];
            ancestors.forEach((a: string) => {
                state.dependencies[a] = state.dependencies[a] ? state.dependencies[a] : [];
                state.dependencies[a].push(f);
            });
        });
        return state;
    }

    static deregisterFieldConditions(fields: IField[], state: any, evaluators: any) : any {
        let {dependencies, conditionals, ancestors} = state;
        fields.forEach((f: IField) => {
            if (evaluators[`${f.id}`]) {
                delete evaluators[`${f.id}`];
                delete conditionals[`${f.id}`];
            }
            if (f.condition.ancestors) {
                delete ancestors[f.id];
            }

            Object.keys(dependencies).forEach(k => {
                if (dependencies[k].indexOf(f.id) > -1) {
                    dependencies[k] = Array.prototype.filter((v) => {v !== f.id});
                }
            });
        });
        return {dependencies: dependencies, conditionals: conditionals, ancestors: ancestors};
    }
}