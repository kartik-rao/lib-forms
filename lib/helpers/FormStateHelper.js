const { buildYup } = require("json-schema-to-yup");
export class FormStateHelper {
    static getInitialState(formData, decorators) {
        let state = {
            currentPage: (formData.content && formData.content.pages.length > 0 ? 0 : 0),
            numPages: (formData.content && formData.content.pages.length > 0 ? formData.content.pages.length : 0),
            confirmDirty: false,
            fieldMeta: {
                locations: {},
                allFields: [],
                pageFields: {}
            },
            values: {},
            touched: {},
            errors: {},
            validationSchema: null
        };
        let validation = {
            validate: false,
            schema: {},
            messages: {}
        };
        // Store page metadata
        formData.content.pages.forEach((page, pi) => {
            page.sections.forEach((section, si) => {
                section.columns.forEach((column, ci) => {
                    column.fields.forEach((field, fi) => {
                        state.fieldMeta.allFields.push(field);
                        state.values[field.id] = undefined;
                        state.touched[field.id] = false;
                        state.errors[field.id] = null;
                        FormStateHelper.registerValidations(validation, field);
                        field.location = field.location = { page: pi, section: si, column: ci, field: fi };
                        state.fieldMeta.locations[field.id] = { page: pi, section: si, column: ci, field: fi };
                        state.fieldMeta.pageFields[pi] = state.fieldMeta.pageFields[pi] ? state.fieldMeta.pageFields[pi] : { names: [], ids: [] };
                        state.fieldMeta.pageFields[pi].names.push(field.name);
                        state.fieldMeta.pageFields[pi].ids.push(field.id);
                    });
                });
            });
        });
        if (validation.validate) {
            let schema = { type: "object", properties: validation.schema };
            state.validationSchema = Object.assign({}, schema, { errMessages: validation.messages });
        }
        return FormStateHelper.registerFieldConditions(state.fieldMeta.allFields, state, decorators);
    }
    static registerValidations(validation, field) {
        let { fieldOptions } = field;
        if (fieldOptions && fieldOptions.type && fieldOptions.rules) {
            validation.validate = true;
            validation.schema[field.name] = { type: fieldOptions.type };
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
    static registerFieldConditions(fields, state, decorators) {
        state = Object.assign({}, state, { evaluators: {}, dependencies: {}, conditionals: {}, ancestors: {} });
        fields.forEach((f) => {
            if (f.condition) {
                state.evaluators[`${f.id}`] = f.condition;
                state.conditionals[`${f.id}`] = { result: f.condition.value(decorators.getFieldValue) };
                if (f.condition.ancestors) {
                    state.ancestors[f.id] = f.condition.ancestors;
                }
            }
        });
        Object.keys(state.ancestors).forEach((f) => {
            let ancestors = state.ancestors[f];
            ancestors.forEach((a) => {
                state.dependencies[a] = state.dependencies[a] ? state.dependencies[a] : [];
                state.dependencies[a].push(f);
            });
        });
        return state;
    }
    static deregisterFieldConditions(fields, state, evaluators) {
        let { dependencies, conditionals, ancestors } = state;
        fields.forEach((f) => {
            if (evaluators[`${f.id}`]) {
                delete evaluators[`${f.id}`];
                delete conditionals[`${f.id}`];
            }
            if (f.condition.ancestors) {
                delete ancestors[f.id];
            }
            Object.keys(dependencies).forEach(k => {
                if (dependencies[k].indexOf(f.id) > -1) {
                    dependencies[k] = Array.prototype.filter((v) => { v !== f.id; });
                }
            });
        });
        return { dependencies: dependencies, conditionals: conditionals, ancestors: ancestors };
    }
}
