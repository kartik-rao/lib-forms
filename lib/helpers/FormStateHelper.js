var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var FormStateHelper = /** @class */ (function () {
    function FormStateHelper() {
    }
    FormStateHelper.registerFieldConditions = function (fields, state, evaluators, decorators) {
        state = __assign({}, state, { dependencies: {}, conditionals: {}, ancestors: {} });
        fields.forEach(function (f) {
            if (f.condition) {
                evaluators["" + f.id] = f.condition;
                state.conditionals["" + f.id] = { result: f.condition.value(decorators.getFieldValue) };
                if (f.condition.ancestors) {
                    state.ancestors[f.id] = f.condition.ancestors;
                }
            }
        });
        Object.keys(state.ancestors).forEach(function (f) {
            var ancestors = state.ancestors[f];
            ancestors.forEach(function (a) {
                state.dependencies[a] = state.dependencies[a] ? state.dependencies[a] : [];
                state.dependencies[a].push(f);
            });
        });
        return state;
    };
    FormStateHelper.deregisterFieldConditions = function (fields, state, evaluators) {
        var dependencies = state.dependencies, conditionals = state.conditionals, ancestors = state.ancestors;
        fields.forEach(function (f) {
            if (evaluators["" + f.id]) {
                delete evaluators["" + f.id];
                delete conditionals["" + f.id];
            }
            if (f.condition.ancestors) {
                delete ancestors[f.id];
            }
            Object.keys(dependencies).forEach(function (k) {
                if (dependencies[k].indexOf(f.id) > -1) {
                    dependencies[k] = Array.prototype.filter(function (v) { v !== f.id; });
                }
            });
        });
        return { dependencies: dependencies, conditionals: conditionals, ancestors: ancestors };
    };
    return FormStateHelper;
}());
export { FormStateHelper };
