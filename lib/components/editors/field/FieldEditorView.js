import { Col, Drawer, Row, Tabs } from "antd";
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
import ChoiceOptionEditorView from "./partials/ChoiceOptionEditorView";
import ConditionsView from "./partials/ConditionsView";
import FieldPropertiesView from "./partials/PropertiesView";
import ValidationView from "./partials/ValidationView";
export const FieldEditorView = () => {
    const editorStore = React.useContext(editorStoreContext);
    if (!editorStore)
        throw new Error("Store is null");
    const localStore = useLocalStore(() => ({
        updateOptions: function (options) {
            editorStore.pushUndoState(`Field "${editorStore.selectedField.label || editorStore.selectedField.name}" options edited`);
            let existing = editorStore.selectedField.componentProps.options;
            // Replace comes from mobx array
            existing["replace"](options);
        },
        onOk: function () {
            editorStore.setEditable(null);
        },
        onCancel: function () { }
    }));
    return useObserver(() => {
        return editorStore.selectedField && React.createElement(Drawer, { title: `Field ${editorStore.selectedField.name} (id=${editorStore.selectedField.id || ''} class=${editorStore.selectedField.className})`, width: 700, onClose: () => editorStore.setEditable(null), visible: editorStore.showFieldEditor, style: { overflow: 'auto', height: '100%' } }, React.createElement(Tabs, { size: "small" },
            React.createElement(Tabs.TabPane, { tab: "Properties", key: "1" },
                React.createElement(Row, null,
                    React.createElement(Col, { span: 24 },
                        React.createElement(FieldPropertiesView, null)))),
            React.createElement(Tabs.TabPane, { tab: "Validation", key: "2" },
                React.createElement(Row, null,
                    React.createElement(Col, { span: 24 },
                        React.createElement(ValidationView, null)))),
            React.createElement(Tabs.TabPane, { tab: "Condition", key: "3" },
                React.createElement(Row, null,
                    React.createElement(Col, { span: 24 },
                        React.createElement(ConditionsView, null)))),
            ['select', 'radiogroup', 'checkboxgroup'].indexOf(editorStore.selectedField.inputType) > -1 && React.createElement(Tabs.TabPane, { tab: "Options", key: "4" },
                React.createElement(Row, null,
                    React.createElement(Col, { span: 24 },
                        React.createElement(ChoiceOptionEditorView, { type: "select", items: editorStore.selectedField.componentProps['options'], onChange: localStore.updateOptions }))))));
    });
};
