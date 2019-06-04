var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from "react";
import { Steps, Button, Card, Row, Col } from "antd";
import EditablePageComponent from "./EditablePage";
import { Formik } from "formik";
import { Logger } from "@kartikrao/lib-logging";
import { FieldPropertiesComponent } from "./FieldProperties";
import { observer } from "mobx-react";
const logger = Logger.getInstance(["ai-lib-forms", "EditableForm"], Logger.severity.debug);
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
let FormComponent = class FormComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { store } = this.props;
        let { formData } = store;
        let self = this;
        return (React.createElement("div", { className: "form-wrapper" },
            formData.content.title &&
                React.createElement(Row, null,
                    React.createElement(Col, { span: 20 },
                        React.createElement(Card, null,
                            React.createElement("h2", null, formData.content.title),
                            React.createElement("br", null),
                            React.createElement("h3", null, formData.content.subtitle)))),
            formData.formLayoutOptions.showSteps && React.createElement(Row, null,
                React.createElement(Col, { span: 20 },
                    React.createElement(Card, null,
                        React.createElement(Steps, { size: "small", current: store.currentPage }, formData.content.pages.map((page, pn) => {
                            return React.createElement(Steps.Step, { title: page.title, key: pn });
                        }))))),
            React.createElement(Row, null,
                React.createElement(Col, { span: 20 },
                    React.createElement(Formik, { onSubmit: store.onSubmit, initialValues: store.values, validate: store.validate, validateOnBlur: true, validateOnChange: true, render: ({ values, errors, status, touched, setFieldValue, setFieldTouched, setFieldError, handleBlur, handleChange, handleSubmit, isSubmitting }) => (React.createElement("form", { onSubmit: handleSubmit },
                            (() => {
                                let { currentPage } = store;
                                let page = store.formData.content.pages[currentPage];
                                let eventHooks = () => {
                                    return {
                                        onChange: (name, value) => {
                                            // setFieldValue(name, value);
                                            handleChange(name);
                                            store.onChange(name, value);
                                        },
                                        onBlur: (name) => {
                                            // setFieldTouched(name);
                                            store.onBlur(name);
                                        },
                                        selectField: store.selectField,
                                        setFieldValue: setFieldValue,
                                        setFieldTouched: setFieldTouched,
                                        setFieldError: setFieldError
                                    };
                                };
                                return React.createElement("div", { className: "page-wrapper" },
                                    React.createElement(EditablePageComponent, { page: page, store: store, index: currentPage, eventHooks: eventHooks }));
                            })(),
                            React.createElement("div", { className: "page-actions" },
                                React.createElement(Card, null,
                                    React.createElement(Row, null,
                                        React.createElement(Col, { span: 24, style: { textAlign: 'right' } },
                                            store.currentPage == store.numPages - 1 && React.createElement(Button, { disabled: Object.keys(touched).length == 0 || hasErrors(errors) || isSubmitting, type: "primary", style: { marginLeft: 8 }, htmlType: "submit", className: "action-button" }, "Submit"),
                                            store.currentPage < store.numPages - 1 && React.createElement(Button, { type: "primary", style: { marginLeft: 8 }, className: "action-button", onClick: () => store.next() }, "Next"),
                                            store.currentPage > 0 && store.numPages > 1 && React.createElement(Button, { type: "primary", className: "action-button", onClick: () => store.prev() }, "Prev"))))),
                            React.createElement("div", null,
                                "Errors",
                                React.createElement("br", null),
                                JSON.stringify(store.errors)),
                            React.createElement("div", null,
                                "Touched",
                                React.createElement("br", null),
                                JSON.stringify(store.touched)),
                            React.createElement("div", null,
                                "Values",
                                React.createElement("br", null),
                                JSON.stringify(store.values)),
                            React.createElement("div", null,
                                "Status",
                                React.createElement("br", null),
                                JSON.stringify(status)))) })),
                React.createElement(Col, { span: 4 }, store.selectedField && React.createElement(FieldPropertiesComponent, { field: store.selectedField })))));
    }
};
FormComponent = __decorate([
    observer
], FormComponent);
export { FormComponent };
export default FormComponent;
