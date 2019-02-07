"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var ai_core_forms_1 = require("@adinfinity/ai-core-forms");
var ai_core_forms_2 = require("@adinfinity/ai-core-forms");
var FieldFactory = /** @class */ (function () {
    function FieldFactory() {
    }
    FieldFactory.createField = function (props) {
        var field = {};
        field.id = props.id;
        field.name = props.name;
        field.type = props.type;
        field.inputType = props.inputType;
        field.icon = props.icon;
        field.width = props.width;
        field.children = props.children;
        field.storage = props.storage;
        field.showLabel = ai_core_forms_1.valueOrDefault(props.showLabel, true);
        field.showLegend = ai_core_forms_1.valueOrDefault(props.showLegend, true);
        field.fieldOptions = new ai_core_forms_2.FieldOptions(Object.assign({ id: props.id }, __assign({}, props.fieldOptions)));
        field.condition = new ai_core_forms_2.Condition(props.id, props.condition);
        field.label = props.label;
        field.helpText = props.helpText;
        field.helpPlacement = props.helpPlacement;
        field.placeholder = props.placeholder;
        field.queryParam = props.queryParam;
        field.saveable = props.saveable;
        field.value = props.value;
        return field;
    };
    return FieldFactory;
}());
exports.FieldFactory = FieldFactory;
