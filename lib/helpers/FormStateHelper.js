export class FormStateHelper {
    static registerFieldConditions(fields, state, evaluators, decorators) {
        state = Object.assign({}, state, { dependencies: {}, conditionals: {}, ancestors: {} });
        fields.forEach((f) => {
            if (f.condition) {
                evaluators[`${f.id}`] = f.condition;
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
