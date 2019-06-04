import { Button, Card, Col, Form, Row, Steps } from "antd";
import * as React from "react";
import { FormStateHelper } from "../helpers/FormStateHelper";
import { PageComponent } from "./Page";
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.evaluators = {};
        this.handleConfirmBlur = (e) => {
            console.log("handleConfirmBlur");
            const value = e.target.value;
            this.setState({ confirmDirty: this.state.confirmDirty || !!value });
        };
        this.handleSubmit = (e) => {
            console.log("handleSubmit");
            e.preventDefault();
            let self = this;
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    let payload = Object.assign({ payload: values }, { props: self.state.innerProps });
                    console.log('Received values of form: ', payload);
                }
                else {
                    // Send user to location of first error
                    let { locations } = self.state.fieldMeta;
                    let firstErrorPage = Object.keys(err).map((fieldId) => {
                        return locations[fieldId].page;
                    }).reduce((pn, initial) => {
                        return initial ? (pn < initial ? pn : initial) : pn;
                    });
                    setTimeout(() => {
                        self.setState({ currentPage: firstErrorPage });
                    });
                }
            });
        };
        this.eventHooks = (fieldId) => {
            return {
                onChange: this.onChange.bind(this, fieldId),
                onBlur: this.handleConfirmBlur.bind(this)
            };
        };
        let { formData } = props;
        console.log("Inside Form Props", this);
        this.state = FormStateHelper.getInitialState(formData, this.props.form);
    }
    next() {
        console.log("nextPage");
        let self = this;
        const currentPage = this.state.currentPage;
        if (!this.props.formData.formLayoutOptions.validationDisablesPaging) {
            this.setState({ currentPage: currentPage + 1 });
            return;
        }
        this.props.form.validateFields(this.state.fieldMeta.pageFields[currentPage].names, (err) => {
            if (!err) {
                self.setState({ currentPage: currentPage + 1 });
            }
        });
    }
    prev() {
        console.log("prevPage");
        const currentPage = this.state.currentPage - 1;
        this.setState({ currentPage });
    }
    onChange(id) {
        let self = this;
        console.log("onChange", id);
        setTimeout(() => {
            let deps = self.state.dependencies[id] || [];
            deps.forEach((d) => {
                let state = Object.assign({}, self.state);
                state.conditionals[d].result = self.evaluators[d].value(self.props.form.getFieldValue);
                self.setState(state);
            });
        }, 0);
        return;
    }
    render() {
        let { formData } = this.props;
        return (React.createElement("div", { className: "form-wrapper" },
            formData.content.title &&
                React.createElement(Card, null,
                    React.createElement("h2", null, formData.content.title),
                    React.createElement("br", null),
                    React.createElement("h3", null, formData.content.subtitle)),
            formData.formLayoutOptions.showSteps && React.createElement(Row, null,
                React.createElement(Col, { span: 24 },
                    React.createElement(Card, null,
                        React.createElement(Steps, { size: "small", current: this.state.currentPage }, formData.content.pages.map((page, pn) => {
                            return React.createElement(Steps.Step, { title: page.title, key: pn });
                        }))))),
            React.createElement(Row, null,
                React.createElement(Col, { span: 24 },
                    React.createElement(Form, { onSubmit: this.handleSubmit, layout: this.props.formData.layout },
                        formData.content.pages.map((page, pn) => {
                            let { currentPage } = this.state;
                            let { formLayoutOptions } = this.props.formData;
                            return React.createElement("div", { className: "page-wrapper", key: pn, style: { 'visibility': currentPage == pn ? 'visible' : 'hidden', display: currentPage == pn ? 'block' : 'none' } },
                                React.createElement(PageComponent, { page: page, conditionals: this.state.conditionals, index: pn, formLayout: formLayoutOptions, decorators: this.props.form, eventHooks: this.eventHooks }));
                        }),
                        React.createElement("div", { className: "page-actions" },
                            React.createElement(Card, null,
                                React.createElement(Row, null,
                                    React.createElement(Col, { span: 24, style: { textAlign: 'right' } }, React.createElement(Form.Item, null,
                                        React.createElement(Button, { disabled: hasErrors(this.props.form.getFieldsError()), type: "primary", style: { marginLeft: 8 }, htmlType: "submit", className: "action-button" }, "Submit"),
                                        this.state.currentPage < this.state.numPages - 1 && React.createElement(Button, { type: "primary", style: { marginLeft: 8 }, className: "action-button", onClick: () => this.next() }, "Next"),
                                        this.state.currentPage > 0 && this.state.numPages > 1 && React.createElement(Button, { type: "primary", className: "action-button", onClick: () => this.prev() }, "Prev")))))))))));
    }
}
export default Form.create()(FormComponent);
