var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from "react";
import { Form, notification, Button, Card, Slider } from "antd";
import { action, observable, computed } from "mobx";
import { SectionLayoutPreview } from "./SectionLayoutPreview";
const formItemLayout = {
    labelCol: {
        xs: { span: 12, offset: 4 },
        sm: { span: 8, offset: 4 },
    },
    wrapperCol: {
        xs: { span: 16 },
        sm: { span: 12 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 3,
            offset: 21,
        },
        sm: {
            span: 3,
            offset: 21,
        },
    },
};
class SectionLayoutEditorView extends React.Component {
    constructor(props) {
        super(props);
        this.updateSpan = (key, value) => {
            this.columnSpans.set(key, value);
        };
        this.updateGutter = (value) => {
            this.gutter = value;
        };
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { selectedSection: section } = this.props.store;
            section.columns.map((column, index) => {
                let thisSpan = this.columnSpans.get(`col${index}`);
                if (column.span != thisSpan) {
                    console.log(`Setting column ${index} span to ${thisSpan}`);
                    column.span = thisSpan;
                }
            });
            if (section.gutter != this.gutter) {
                section.gutter = this.gutter;
            }
            notification.info({ message: `Section - ${section.name}`,
                description: `Saved section layout successfully` });
            return;
        };
        this.initialize();
    }
    initialize() {
        let { section } = this.props;
        this.gutter = section.gutter;
        this.columnSpans = observable.map({});
        section.columns.map((col, index) => {
            this.columnSpans.set(`col${index}`, col.span);
        });
    }
    get colspans() {
        let spans = [];
        this.columnSpans.forEach((value) => {
            spans.push(value);
        });
        return spans;
    }
    render() {
        let { getFieldDecorator } = this.props.form;
        return React.createElement(Card, { size: "small", title: "Section Layout" },
            React.createElement("p", null, "Assign 24 units (aliquots) across columns in a section, use gutter to space columns"),
            React.createElement(Form, Object.assign({}, formItemLayout, { onSubmit: (e) => this.handleSubmit(e), layout: "horizontal" }),
                React.createElement(Form.Item, { label: "Gutter" }, getFieldDecorator('gutter', {
                    initialValue: this.gutter || 0,
                    rules: [{ type: 'number' }]
                })(React.createElement(Slider, { step: 8, max: 48, onChange: (e) => this.updateGutter(e) }))),
                this.props.section.columns.map((column, index) => {
                    return React.createElement(Form.Item, { label: `Column ${index + 1} span`, key: index }, getFieldDecorator(`columnSpans[col${index}]`, {
                        initialValue: column.span || 0,
                        rules: [{ type: 'number' }]
                    })(React.createElement(Slider, { step: 1, max: 24, onChange: (e) => this.updateSpan(`col${index}`, e) })));
                }),
                React.createElement(SectionLayoutPreview, { gutter: this.gutter, colspans: this.colspans }),
                React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                    React.createElement(Button, { type: "primary", htmlType: "submit", style: { marginTop: '15px' }, onClick: this.handleSubmit }, "Apply"))));
    }
}
__decorate([
    observable
], SectionLayoutEditorView.prototype, "gutter", void 0);
__decorate([
    observable
], SectionLayoutEditorView.prototype, "columnSpans", void 0);
__decorate([
    action
], SectionLayoutEditorView.prototype, "initialize", null);
__decorate([
    computed
], SectionLayoutEditorView.prototype, "colspans", null);
__decorate([
    action
], SectionLayoutEditorView.prototype, "updateSpan", void 0);
__decorate([
    action
], SectionLayoutEditorView.prototype, "updateGutter", void 0);
__decorate([
    action.bound
], SectionLayoutEditorView.prototype, "handleSubmit", void 0);
const WrappedSectionLayoutEditorView = Form.create({ name: 'SectionLayoutEditorView' })(SectionLayoutEditorView);
export default WrappedSectionLayoutEditorView;
