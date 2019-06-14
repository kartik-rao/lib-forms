var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Col, Drawer, Row, Tabs } from "antd";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import FormContentEditorView from "./partials/FormContentSettingsView";
import FormLayoutView from "./partials/FormLayoutView";
import FormPropertiesEditorView from "./partials/FormPropertiesEditorView";
let FormEditorView = class FormEditorView extends React.Component {
    render() {
        let { editorStore } = this.props.store;
        let form = editorStore.formEditorVisible ? toJS(editorStore.formStore.form) : null;
        return form && React.createElement(Drawer, { title: `Form "${form.name}" `, onClose: () => editorStore.setFormEditorVisible(false), visible: editorStore.formEditorVisible == true, width: 700, style: { overflow: 'hidden' } }, React.createElement(Tabs, { size: "small" },
            React.createElement(Tabs.TabPane, { tab: "Settings", key: "1" },
                React.createElement(Row, null,
                    React.createElement(Col, { span: 24 },
                        React.createElement(FormPropertiesEditorView, { store: this.props.store })))),
            React.createElement(Tabs.TabPane, { tab: "Content", key: "2" },
                React.createElement(Row, null,
                    React.createElement(Col, { span: 24 },
                        React.createElement(FormContentEditorView, { store: this.props.store })))),
            React.createElement(Tabs.TabPane, { tab: "Layout", key: "3" },
                React.createElement(Row, null,
                    React.createElement(Col, { span: 24 },
                        React.createElement(FormLayoutView, { store: this.props.store }))))));
    }
};
FormEditorView = __decorate([
    observer
], FormEditorView);
export { FormEditorView };
