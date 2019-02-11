import {IField} from "@adinfinity/ai-core-forms";

export class FormStateHelper {
    static registerFieldConditions(fields: IField[], state: any, evaluators: any, decorators: any) : any {
        state = {...state, dependencies: {}, conditionals: {}, ancestors: {}};
        fields.forEach((f: IField) => {
            if(f.condition) {
                evaluators[`${f.id}`] = f.condition;
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