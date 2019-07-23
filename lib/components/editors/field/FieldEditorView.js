var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Col, Drawer, Row, Tabs } from "antd";
import { action } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import ChoiceOptionEditorView from "./partials/ChoiceOptionEditorView";
import ConditionsView from "./partials/ConditionsView";
import FieldPropertiesView from "./partials/PropertiesView";
import { ValidationView } from "./partials/ValidationView";
let FieldEditorView = class FieldEditorView extends React.Component {
    constructor(props) {
        super(props);
    }
    updateOptions(options) {
        this.props.store.selectedField.componentProps["options"] = options;
    }
    onOk() {
        this.props.store.setEditable(null);
    }
    onCancel() {
    }
    render() {
        let { store } = this.props;
        let { selectedField: field } = store;
        return field && React.createElement(Drawer, { title: `Field ${field.name} (id=${field.id || ''} class=${field.className})`, width: 700, onClose: () => store.setEditable(null), visible: store.showFieldEditor, style: { overflow: 'auto', height: 'calc(80% - 108px)', paddingBottom: '108px' } }, React.createElement(Tabs, { size: "small" },
            React.createElement(Tabs.TabPane, { tab: "Properties", key: "1" },
                React.createElement(Row, null,
                    React.createElement(Col, { span: 24 },
                        React.createElement(FieldPropertiesView, { store: this.props.store })))),
            React.createElement(Tabs.TabPane, { tab: "Validation", key: "2" },
                React.createElement(Row, null,
                    React.createElement(Col, { span: 24 },
                        React.createElement(ValidationView, { store: this.props.store })))),
            React.createElement(Tabs.TabPane, { tab: "Condition", key: "3" },
                React.createElement(Row, null,
                    React.createElement(Col, { span: 24 },
                        React.createElement(ConditionsView, { store: this.props.store })))),
            ['select', 'radiogroup', 'checkboxgroup'].indexOf(field.inputType) > -1 && React.createElement(Tabs.TabPane, { tab: "Options", key: "4" },
                React.createElement(Row, null,
                    React.createElement(Col, { span: 24 },
                        React.createElement(ChoiceOptionEditorView, { type: "select", items: field.componentProps['options'], onChange: this.updateOptions }))))));
    }
};
__decorate([
    action.bound
], FieldEditorView.prototype, "updateOptions", null);
__decorate([
    action
], FieldEditorView.prototype, "onOk", null);
__decorate([
    action
], FieldEditorView.prototype, "onCancel", null);
FieldEditorView = __decorate([
    observer
], FieldEditorView);
export { FieldEditorView };
