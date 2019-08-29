import { Button, Card, Form, notification, Slider } from "antd";
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import { editorStoreContext } from "../../../../store/EditorStoreProvider";
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
const SectionLayoutEditorView = (props) => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    let colSpanMap = {};
    store.selectedSection.columns.map((col, index) => {
        colSpanMap[`col${index}`] = col.span;
    });
    const localStore = useLocalStore(() => ({
        gutter: store.selectedSection.gutter,
        columnSpanMap: colSpanMap,
        updateSpan: function (key, value) {
            this.columnSpanMap[key] = value;
        },
        updateGutter: function (value) {
            this.gutter = value;
        },
        handleSubmit: function (e) {
            e.preventDefault();
            e.stopPropagation();
            let { selectedSection: section } = store;
            let self = this;
            section.columns.map((column, index) => {
                let thisSpan = self.columnSpanMap[`col${index}`];
                if (column.span != thisSpan) {
                    console.log(`Setting column ${index} span to ${thisSpan}`);
                    column.span = thisSpan;
                }
            });
            if (section.gutter != this.gutter) {
                section.gutter = this.gutter;
            }
            notification.info({ message: `Section - ${section.name}`, description: `Saved section layout successfully` });
            return;
        }
    }));
    return useObserver(() => {
        return React.createElement(Card, { size: "small", title: "Section Layout" },
            React.createElement("p", null, "Assign 24 units (aliquots) across columns in a section, use gutter to space columns"),
            React.createElement(Form, Object.assign({}, formItemLayout, { onSubmit: (e) => localStore.handleSubmit(e), layout: "horizontal" }),
                React.createElement(Form.Item, { label: "Gutter" }, props.form.getFieldDecorator('gutter', {
                    initialValue: localStore.gutter || 0,
                    rules: [{ type: 'number' }]
                })(React.createElement(Slider, { step: 8, max: 48, onChange: (e) => localStore.updateGutter(parseInt(e.toString())) }))),
                store.selectedSection.columns.map((column, index) => {
                    return React.createElement(Form.Item, { label: `Column ${index + 1} span`, key: index }, props.form.getFieldDecorator(`columnSpans[col${index}]`, {
                        initialValue: column.span || 0,
                        rules: [{ type: 'number' }]
                    })(React.createElement(Slider, { step: 1, max: 24, onChange: (e) => localStore.updateSpan(`col${index}`, e) })));
                }),
                React.createElement(SectionLayoutPreview, { gutter: localStore.gutter, colspans: localStore.columnSpanMap }),
                React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                    React.createElement(Button, { type: "primary", htmlType: "submit", style: { marginTop: '15px' }, onClick: localStore.handleSubmit }, "Apply"))));
    });
};
export default Form.create()(SectionLayoutEditorView);
