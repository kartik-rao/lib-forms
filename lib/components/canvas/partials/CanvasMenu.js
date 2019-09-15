import { Button, Drawer, Icon, Popconfirm, Popover, Switch, notification } from 'antd';
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
export const CanvasMenu = (props) => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    const changeLogContent = useObserver(() => {
        return store.changelog.map((line, i) => {
            return React.createElement("p", { key: i }, line);
        });
    });
    const localStore = useLocalStore(() => ({
        toggleValidation: function () {
            store.formStore.validationDisabled = !store.formStore.validationDisabled;
        },
        toggleConditions: function () {
            store.formStore.conditionsDisabled = !store.formStore.conditionsDisabled;
        },
        onSave: function () {
            if (props.onSave) {
                props.onSave(store.asJSONForm);
            }
        },
        onClose: function () {
            if (props.onClose) {
                props.onClose();
            }
        },
        onUndo: function () {
            let change = store.popUndoState();
            notification.info({ message: `Undo - ${change}` });
        }
    }));
    return useObserver(() => {
        return React.createElement(Drawer, { height: 60, width: `calc(100% - 500px)`, placement: "top", mask: false, maskClosable: true, onClose: () => store.toggleShowCanvasMenu(), visible: store.showCanvasMenu, bodyStyle: { padding: "12px" } },
            React.createElement("div", { style: { textAlign: "center" } },
                React.createElement("span", { className: "fl-right-margin-ten" },
                    "Show Palette",
                    React.createElement(Switch, { onChange: () => store.showPalette = !store.showPalette, defaultChecked: store.showPalette, style: { marginLeft: '5px' }, checkedChildren: "YES", unCheckedChildren: "NO" })),
                React.createElement("span", { className: "fl-right-margin-ten" },
                    "Show Layout",
                    React.createElement(Switch, { onChange: () => store.showLayout = !store.showLayout, defaultChecked: store.showLayout, style: { marginLeft: '5px' }, checkedChildren: "YES", unCheckedChildren: "NO" })),
                React.createElement("span", { className: "fl-right-margin-ten" },
                    "Validations",
                    React.createElement(Switch, { onChange: localStore.toggleValidation, defaultChecked: !store.formStore.validationDisabled, style: { marginLeft: '5px' }, checkedChildren: "ON", unCheckedChildren: "OFF" })),
                React.createElement("span", { className: "fl-right-margin-ten" },
                    "Conditions",
                    React.createElement(Switch, { onChange: localStore.toggleConditions, defaultChecked: !store.formStore.conditionsDisabled, style: { marginLeft: '5px' }, checkedChildren: "ON", unCheckedChildren: "OFF" })),
                React.createElement(Popover, { content: changeLogContent, title: "Changelog", trigger: "click", style: { marginLeft: "10px" } },
                    React.createElement(Button, { size: "small", className: "fl-right-margin-ten", disabled: !store.isDirty },
                        React.createElement(Icon, { type: "ellipsis" }),
                        "Show Changes")),
                React.createElement(Button, { key: "undo", type: "default", disabled: !store.isDirty, size: "small", title: "Undo", className: "fl-right-margin-ten", onClick: localStore.onUndo },
                    React.createElement(Icon, { type: "undo" }),
                    "Undo"),
                React.createElement(Button, { key: "save", type: "primary", disabled: !store.isDirty, size: "small", title: "Save", className: "fl-right-margin-ten", onClick: localStore.onSave },
                    React.createElement(Icon, { type: "save" }),
                    "Save"),
                React.createElement(Popconfirm, { key: "close", placement: "topLeft", title: store.isDirty ? 'Discard unsaved changes and exit ?' : 'Exit Canvas ?', onConfirm: localStore.onClose, okText: "Yes", cancelText: "No" },
                    React.createElement(Button, { type: "danger", size: "small", title: "Close", className: "fl-right-margin-ten" },
                        React.createElement(Icon, { type: "close" }),
                        "Exit"))));
    });
};
