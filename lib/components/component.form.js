"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = require("react");
var antd_1 = require("antd");
var component_field_1 = require("./component.field");
require("../app.css");
var FormComponent = /** @class */ (function (_super) {
    __extends(FormComponent, _super);
    function FormComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.evaluators = {};
        _this.handleConfirmBlur = function (e) {
            var value = e.target.value;
            _this.setState({ confirmDirty: _this.state.confirmDirty || !!value });
        };
        var state = { confirmDirty: false, currentPage: 0, numPages: props.content.pages.length };
        var self = _this;
        props.content.allFields.forEach(function (f) {
            self.evaluators["" + f.id] = f.condition;
            state["" + f.id] = { result: f.condition.value(_this.props.form) };
        });
        _this.state = state;
        return _this;
    }
    FormComponent.prototype.handleSubmit = function (e) {
        e.preventDefault();
        var self = this;
        this.props.form.validateFields(function (err, values) {
            if (!err) {
                var payload = Object.assign({ payload: values }, { props: self.state.innerProps });
                console.log('Received values of form: ', payload);
            }
            else {
                // Send user to location of first error
                var locations_1 = self.props.content.fieldLocation;
                var firstErrorPage_1 = Object.keys(err).map(function (fieldId) {
                    return locations_1[fieldId].page;
                }).reduce(function (pn, initial) {
                    return initial ? (pn < initial ? pn : initial) : pn;
                });
                setTimeout(function () {
                    self.setState({ currentPage: firstErrorPage_1 });
                });
            }
        });
    };
    FormComponent.prototype.onChange = function (id) {
        var self = this;
        var _a = this.props.form, getFieldValue = _a.getFieldValue, getFieldsValue = _a.getFieldsValue, getFieldError = _a.getFieldError, isFieldTouched = _a.isFieldTouched, isFieldValidating = _a.isFieldValidating;
        setTimeout(function () {
            var deps = self.props.content.dependencyMap[id] || [];
            deps.forEach(function (d) {
                var state = Object.assign({}, self.state);
                state[d].result = self.evaluators[d].value(self.props.form);
                self.setState(state);
            });
        }, 0);
        return;
    };
    FormComponent.prototype.renderPage = function (page, pn) {
        var _this = this;
        return React.createElement("div", { className: "page", key: pn }, page.sections.map(function (section, sn) {
            return _this.renderSection(section, sn);
        }));
    };
    FormComponent.prototype.renderColumn = function (column, cn, total) {
        if (total === void 0) { total = 1; }
        var self = this;
        return React.createElement(antd_1.Col, { span: 24 / total, key: cn }, column.fields.map(function (field, fn) {
            return self.renderField(field, fn);
        }));
    };
    FormComponent.prototype.renderSection = function (section, sn) {
        var numColumns = section.columns.length;
        var self = this;
        var _a = this.props.formLayoutOptions, showSectionTitles = _a.showSectionTitles, showSectionBorders = _a.showSectionBorders;
        return React.createElement(antd_1.Card, { bordered: showSectionBorders, title: showSectionTitles ? section.name : "", key: sn },
            React.createElement(antd_1.Row, { gutter: 16 }, section.columns.map(function (item, fn) {
                return self.renderColumn(item, fn, numColumns);
            })));
    };
    FormComponent.prototype.renderField = function (field, fn) {
        var getFieldDecorator = this.props.form.getFieldDecorator;
        var decorator = getFieldDecorator(field.id, field.fieldOptions);
        var onChange = this.onChange.bind(this, field.id);
        var onBlur = this.handleConfirmBlur.bind(this);
        var enabled = this.state[field.id].result;
        field.fieldOptions.hidden = !enabled;
        var itemLayout = this.props.formLayoutOptions;
        return enabled ? React.createElement(component_field_1.FieldComponent, { field: field, onBlur: onBlur, onChange: onChange, decorator: decorator, key: fn, itemLayout: itemLayout }) : '';
    };
    FormComponent.prototype.next = function () {
        var self = this;
        var currentPage = this.state.currentPage;
        if (!this.props.formLayoutOptions.validationDisablesPaging) {
            this.setState({ currentPage: currentPage + 1 });
            return;
        }
        this.props.form.validateFields(this.props.content.pages[currentPage].fieldNames, function (err) {
            if (!err) {
                self.setState({ currentPage: currentPage + 1 });
            }
        });
    };
    FormComponent.prototype.prev = function () {
        var currentPage = this.state.currentPage - 1;
        this.setState({ currentPage: currentPage });
    };
    FormComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props.form, getFieldDecorator = _a.getFieldDecorator, getFieldError = _a.getFieldError, getFieldsValue = _a.getFieldsValue, setFieldsValue = _a.setFieldsValue;
        var numPages = this.props.content.pages.length;
        var self = this;
        var renderField = this.renderField;
        var _b = this.props.formLayoutOptions, showPageTitles = _b.showPageTitles, showSteps = _b.showSteps;
        return (React.createElement("div", { className: "form-wrapper" },
            showSteps && React.createElement(antd_1.Row, null,
                React.createElement(antd_1.Col, { span: 24 },
                    React.createElement(antd_1.Card, null,
                        React.createElement(antd_1.Steps, { size: "small", current: this.state.currentPage }, this.props.content.pages.map(function (page, pn) {
                            return React.createElement(antd_1.Steps.Step, { title: page.title, key: pn });
                        }))))),
            React.createElement(antd_1.Row, null,
                React.createElement(antd_1.Col, { span: 24 },
                    React.createElement(antd_1.Form, { onSubmit: this.handleSubmit.bind(this), layout: this.props.layout }, this.props.content.pages.map(function (page, pn) {
                        var _a = _this.state, numPages = _a.numPages, currentPage = _a.currentPage;
                        return React.createElement("div", { className: "page-wrapper", key: pn, style: { 'visibility': currentPage == pn ? 'visible' : 'hidden', display: currentPage == pn ? 'block' : 'none' } },
                            React.createElement("div", { className: "page-content" },
                                React.createElement(antd_1.Card, { title: showPageTitles ? page.title : "" }, _this.renderPage(page, pn))),
                            React.createElement("div", { className: "page-action" },
                                React.createElement("div", null,
                                    React.createElement(antd_1.Form.Item, __assign({}, _this.props.formLayoutOptions),
                                        React.createElement(antd_1.Button, { type: "primary", htmlType: "submit", className: "action-button" }, "Submit"),
                                        currentPage < numPages - 1 && React.createElement(antd_1.Button, { type: "primary", className: "action-button", onClick: function () { return _this.next(); } }, "Next"),
                                        currentPage > 0 && numPages > 1 && React.createElement(antd_1.Button, { type: "primary", className: "action-button", onClick: function () { return _this.prev(); } }, "Prev")))));
                    }))))));
    };
    return FormComponent;
}(React.Component));
exports.default = antd_1.Form.create()(FormComponent);
