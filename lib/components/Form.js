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
import * as React from "react";
import { Steps, Form, Button, Card, Row, Col } from "antd";
import { PageComponent } from "./Page";
import { FormStateHelper } from "../helpers/FormStateHelper";
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(function (field) { return fieldsError[field]; });
}
var FormComponent = /** @class */ (function (_super) {
    __extends(FormComponent, _super);
    function FormComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.evaluators = {};
        _this.handleConfirmBlur = function (e) {
            console.log("handleConfirmBlue");
            var value = e.target.value;
            _this.setState({ confirmDirty: _this.state.confirmDirty || !!value });
        };
        _this.handleSubmit = function (e) {
            console.log("handleSubmit");
            e.preventDefault();
            var self = _this;
            _this.props.form.validateFields(function (err, values) {
                if (!err) {
                    var payload = Object.assign({ payload: values }, { props: self.state.innerProps });
                    console.log('Received values of form: ', payload);
                }
                else {
                    // Send user to location of first error
                    var locations_1 = self.state.fieldMeta.locations;
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
        _this.eventHooks = function (fieldId) {
            return {
                onChange: _this.onChange.bind(_this, fieldId),
                onBlur: _this.handleConfirmBlur.bind(_this)
            };
        };
        var formData = props.formData;
        var state = {
            currentPage: (formData.content && formData.content.pages.length > 0 ? 0 : 0),
            numPages: (formData.content && formData.content.pages.length > 0 ? formData.content.pages.length : 0),
            confirmDirty: false,
            fieldMeta: {
                locations: {},
                allFields: [],
                pageFields: {}
            }
        };
        // Store page metadata
        formData.content.pages.forEach(function (page, pi) {
            page.sections.forEach(function (section, si) {
                section.columns.forEach(function (column, ci) {
                    column.fields.forEach(function (field, fi) {
                        state.fieldMeta.allFields.push(field);
                        field.location = field.location = { page: pi, section: si, column: ci, field: fi };
                        state.fieldMeta.locations[field.id] = { page: pi, section: si, column: ci, field: fi };
                        state.fieldMeta.pageFields[pi] = state.fieldMeta.pageFields[pi] ? state.fieldMeta.pageFields[pi] : { names: [], ids: [] };
                        state.fieldMeta.pageFields[pi].names.push(field.name);
                    });
                });
            });
        });
        _this.state = FormStateHelper.registerFieldConditions(state.fieldMeta.allFields, state, _this.evaluators, _this.props.form);
        return _this;
        // this.state = {...state, ...this.registerFieldConditions(state.fieldMeta.allFields)};
    }
    FormComponent.prototype.componentDidMount = function () {
        console.log("Form Mounted");
    };
    FormComponent.prototype.next = function () {
        console.log("nextPage");
        var self = this;
        var currentPage = this.state.currentPage;
        if (!this.props.formData.formLayoutOptions.validationDisablesPaging) {
            this.setState({ currentPage: currentPage + 1 });
            return;
        }
        this.props.form.validateFields(this.state.fieldMeta.pageFields[currentPage].names, function (err) {
            if (!err) {
                self.setState({ currentPage: currentPage + 1 });
            }
        });
    };
    FormComponent.prototype.prev = function () {
        console.log("prevPage");
        var currentPage = this.state.currentPage - 1;
        this.setState({ currentPage: currentPage });
    };
    FormComponent.prototype.onChange = function (id) {
        var self = this;
        console.log("onChange", id);
        setTimeout(function () {
            var deps = self.state.dependencies[id] || [];
            deps.forEach(function (d) {
                var state = Object.assign({}, self.state);
                state.conditionals[d].result = self.evaluators[d].value(self.props.form.getFieldValue);
                self.setState(state);
            });
        }, 0);
        return;
    };
    FormComponent.prototype.render = function () {
        var _this = this;
        var formData = this.props.formData;
        return (React.createElement("div", { className: "form-wrapper" },
            formData.content.title &&
                React.createElement(Card, null,
                    React.createElement("h2", null, formData.content.title),
                    React.createElement("br", null),
                    React.createElement("h3", null, formData.content.subtitle)),
            formData.formLayoutOptions.showSteps && React.createElement(Row, null,
                React.createElement(Col, { span: 24 },
                    React.createElement(Card, null,
                        React.createElement(Steps, { size: "small", current: this.state.currentPage }, formData.content.pages.map(function (page, pn) {
                            return React.createElement(Steps.Step, { title: page.title, key: pn });
                        }))))),
            React.createElement(Row, null,
                React.createElement(Col, { span: 24 },
                    React.createElement(Form, { onSubmit: this.handleSubmit, layout: this.props.layout },
                        formData.content.pages.map(function (page, pn) {
                            var currentPage = _this.state.currentPage;
                            var formLayoutOptions = _this.props.formData.formLayoutOptions;
                            return React.createElement("div", { className: "page-wrapper", key: pn, style: { 'visibility': currentPage == pn ? 'visible' : 'hidden', display: currentPage == pn ? 'block' : 'none' } },
                                React.createElement(PageComponent, { page: page, conditionals: _this.state.conditionals, index: pn, formLayout: formLayoutOptions, decorators: _this.props.form, eventHooks: _this.eventHooks }));
                        }),
                        React.createElement("div", { className: "page-actions" },
                            React.createElement(Card, null,
                                React.createElement(Row, null,
                                    React.createElement(Col, { span: 24, style: { textAlign: 'right' } }, React.createElement(Form.Item, null,
                                        React.createElement(Button, { disabled: hasErrors(this.props.form.getFieldsError()), type: "primary", style: { marginLeft: 8 }, htmlType: "submit", className: "action-button" }, "Submit"),
                                        this.state.currentPage < this.state.numPages - 1 && React.createElement(Button, { type: "primary", style: { marginLeft: 8 }, className: "action-button", onClick: function () { return _this.next(); } }, "Next"),
                                        this.state.currentPage > 0 && this.state.numPages > 1 && React.createElement(Button, { type: "primary", className: "action-button", onClick: function () { return _this.prev(); } }, "Prev")))))))))));
    };
    return FormComponent;
}(React.Component));
export default Form.create()(FormComponent);
