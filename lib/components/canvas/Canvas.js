import { Factory, FormStoreProvider, FormView } from "@kartikrao/lib-forms-core";
import "@kartikrao/lib-forms-core/lib/forms.core.m.css";
import { Badge, Button, Card, Col, Empty, Icon, Layout, message, Popconfirm, Popover, Switch } from 'antd';
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { editorStoreContext } from "../../store/EditorStoreProvider";
import { ComponentMenu } from "./ComponentMenu";
import { ComponentTree } from "./ComponentTree";
const { Content } = Layout;
const genRandom = () => {
    return `${Math.ceil(Math.random() * 1e6)}`;
};
const FieldEditorView = React.lazy(() => import(/* webpackChunkName: "editors-field" */ "../editors/field/FieldEditorView").then((module) => { return { default: module.FieldEditorView }; }));
const FormEditorView = React.lazy(() => import(/* webpackChunkName: "editors-form" */ "../editors/form/FormEditorView").then((module) => { return { default: module.FormEditorView }; }));
const PageEditorView = React.lazy(() => import(/* webpackChunkName: "editors-page" */ "../editors/page/PageEditorView"));
const SectionEditorView = React.lazy(() => import(/* webpackChunkName: "editors-section" */ "../editors/section/SectionEditorView").then((module) => { return { default: module.SectionEditorView }; }));
export const Canvas = (props) => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    const localStore = useLocalStore(() => ({
        siderCollapsed: false,
        get hasContent() {
            return store.formStore.form.content && store.formStore.form.content.pages && store.formStore.form.content.pages.length > 0;
        },
        get itemMap() {
            let itemMap = {};
            store.formStore.form.content.pages.forEach((p) => {
                itemMap[p.uuid] = p;
                p.sections.forEach((s, si) => {
                    itemMap[s.uuid] = s;
                    s.columns.forEach((c, ci) => {
                        itemMap[c.uuid] = c;
                        c.fields.forEach((f, fi) => {
                            itemMap[f.uuid] = f;
                        });
                    });
                });
            });
            return itemMap;
        },
        handleNewItem: function (result) {
            const { destination, type } = result;
            const { form } = store.formStore;
            if (destination == null || !type) {
                return;
            }
            let updateLog;
            const dIndex = destination.index;
            let id = genRandom();
            if (type == "Page") {
                let nextPageNum = form.content.pages.length;
                let page = Factory.makePages(store.formStore, {
                    id: `${nextPageNum}`,
                    title: `Page ${nextPageNum}`,
                    name: `Page ${nextPageNum}`,
                    sections: []
                })[0];
                updateLog = `Added page at position [${nextPageNum}]`;
                form.addPage(page, dIndex);
            }
            else {
                let [dParentId] = destination.droppableId.split('|');
                if (type == "Section") {
                    let page = this.itemMap[dParentId];
                    let section = Factory.makeSections(store.formStore, {
                        id: `${id}`,
                        name: `Section_${id}`,
                        columns: []
                    })[0];
                    updateLog = `Added section to page [${page.name}]`;
                    page.addSection(section, dIndex);
                }
                else if (type == "Column") {
                    let section = this.itemMap[dParentId];
                    let column = Factory.makeColumns(store.formStore, {
                        id: `${id}`,
                        name: `Column_${id}`,
                        fields: []
                    })[0];
                    let numCols = section.columns.length;
                    let evenWidth = Math.abs(24 / (numCols + 1));
                    section.addColumn(column, dIndex);
                    section.columns.forEach((c) => {
                        c.span = evenWidth;
                    });
                    updateLog = `Added column to section [${section.name}]`;
                }
                else if (type == "Field") {
                    let column = this.itemMap[dParentId];
                    let field = Factory.makeFields(store.formStore, {
                        id: `${id}`,
                        name: `Field_${id}`,
                        label: `Untitled ${result.draggableId}`,
                        inputType: result.draggableId,
                        componentProps: {},
                        fieldOptions: {}
                    })[0];
                    updateLog = `Added field [${result.draggableId}] to column [${column.name}]`;
                    column.addField(field, dIndex);
                }
            }
            console.log("Handle Add - PUSH");
            store.pushUndoState(updateLog);
            return;
        },
        handleMoveItem: function (result) {
            const { source, destination, type } = result;
            const { form } = store.formStore;
            const sIndex = source.index;
            const dIndex = destination.index;
            let updateLog;
            if (type == "Page") {
                updateLog = `Moved page from position [${source.index + 1}] to [${destination.index + 1}]`;
                form.swapPages(source.index, destination.index);
            }
            else {
                let [sParentId] = source.droppableId.split('|');
                let [dParentId] = destination.droppableId.split('|');
                let sameParent = sParentId == dParentId;
                if (type == "Section") {
                    let prev = this.itemMap[sParentId];
                    if (sameParent) {
                        updateLog = `Moved section from position [${sIndex + 1}] to [${dIndex + 1}]`;
                        prev.swapSections(sIndex, dIndex);
                    }
                    else {
                        let next = this.itemMap[dParentId];
                        let section = prev.sections[sIndex];
                        updateLog = `Moved section ${section.name} to page [${next.name}] position [${dIndex + 1}]`;
                        prev.removeSection(sIndex);
                        next.addSection(section, dIndex);
                    }
                }
                else if (type == "Column") {
                    let prev = this.itemMap[sParentId];
                    if (sameParent) {
                        prev.swapColumns(sIndex, dIndex);
                        updateLog = `Moved column in section [${prev.name}] from position [${sIndex + 1}] to [${dIndex + 1}]`;
                    }
                    else {
                        let next = this.itemMap[dParentId];
                        let column = prev.columns[sIndex];
                        updateLog = `Moved column from section [${prev.name}] to [${next.name}]`;
                        prev.removeColumn(sIndex);
                        next.addColumn(column, dIndex);
                    }
                }
                else if (type == "Field") {
                    let prev = this.itemMap[sParentId];
                    if (sameParent) {
                        prev.swapFields(sIndex, dIndex);
                        updateLog = `Moved field in column [${prev.name}] from position [${sIndex + 1}] to [${dIndex + 1}]`;
                    }
                    else {
                        let next = this.itemMap[dParentId];
                        let column = prev.fields[sIndex];
                        updateLog = `Moved field from column [${prev.name}] to [${next.name}]`;
                        prev.removeField(sIndex);
                        next.addField(column, dIndex);
                    }
                }
            }
            store.pushUndoState(updateLog);
        },
        onDragEnd: function (result) {
            const { source } = result;
            if (source.droppableId.startsWith('New')) {
                this.handleNewItem(result);
            }
            else {
                this.handleMoveItem(result);
            }
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
            message.success(`Undo - ${change}`);
        },
        toggleValidation: function () {
            store.formStore.validationDisabled = !store.formStore.validationDisabled;
        },
        toggleConditions: function () {
            store.formStore.conditionsDisabled = !store.formStore.conditionsDisabled;
        }
    }));
    const changeLogContent = useObserver(() => {
        return store.changelog.map((line, i) => {
            return React.createElement("p", { key: i }, line);
        });
    });
    const canvasTitle = useObserver(() => {
        return React.createElement("span", null,
            React.createElement(Badge, { status: store.isDirty ? "error" : "success" }),
            "Preview ",
            store.isDirty,
            React.createElement(Popover, { content: changeLogContent, title: "Changelog", trigger: "click", style: { marginLeft: "10px" } },
                React.createElement(Button, { size: "small", style: { marginLeft: '15px' }, disabled: !store.isDirty },
                    React.createElement(Icon, { type: "ellipsis" }),
                    store.changelog.length > 0 ? "Show Changes" : "Unchanged")),
            React.createElement(Button, { key: "undo", type: "default", disabled: !store.isDirty, size: "small", title: "Undo", style: { marginLeft: '10px' }, onClick: localStore.onUndo },
                React.createElement(Icon, { type: "undo" }),
                "Undo"));
    });
    const canvasMenu = useObserver(() => {
        return React.createElement("span", null,
            React.createElement("span", { style: { float: "left" } },
                React.createElement("span", { style: { marginRight: "10px" } },
                    "Validation",
                    React.createElement(Switch, { onChange: localStore.toggleValidation, defaultChecked: !store.formStore.validationDisabled, style: { marginLeft: '5px' }, checkedChildren: "ON", unCheckedChildren: "OFF" })),
                React.createElement("span", { style: { marginRight: "10px" } },
                    "Conditions",
                    React.createElement(Switch, { onChange: localStore.toggleConditions, defaultChecked: !store.formStore.conditionsDisabled, style: { marginLeft: '5px' }, checkedChildren: "ON", unCheckedChildren: "OFF" }))),
            React.createElement(Popconfirm, { key: "close", placement: "topLeft", title: store.isDirty ? 'Discard unsaved changes and exit ?' : 'Exit Canvas ?', onConfirm: localStore.onClose, okText: "Yes", cancelText: "No" },
                React.createElement(Button, { type: "danger", size: "small", title: "Close", style: { marginRight: '10px' } },
                    React.createElement(Icon, { type: "close" }),
                    "Close")),
            React.createElement(Button, { key: "save", type: "primary", disabled: !store.isDirty, size: "small", title: "Save", style: { marginRight: '10px' }, onClick: localStore.onSave },
                React.createElement(Icon, { type: "save" }),
                "Save"));
    });
    return useObserver(() => {
        return React.createElement(Layout, { className: "fl-full-height-nopad" },
            React.createElement(Layout.Content, null,
                React.createElement(DragDropContext, { onDragEnd: localStore.onDragEnd },
                    React.createElement(Layout, { className: "fl-full-height-nopad" },
                        React.createElement(Layout.Sider, { trigger: null, collapsed: !store.showPalette, style: { zIndex: 11, background: '#FFFF' }, collapsible: true, theme: "light", collapsedWidth: 0 },
                            React.createElement("div", { className: "fl-full-height fl-grey-box fl-shadow-sides" },
                                React.createElement(ComponentMenu, null))),
                        React.createElement(Content, { style: { overflow: "hidden", padding: '0' } },
                            React.createElement(Col, { span: 8, className: "fl-full-height" },
                                React.createElement("div", { className: "fl-full-height fl-grey-box fl-shadow-sides" },
                                    React.createElement(ComponentTree, null))),
                            React.createElement(Col, { span: 16, className: "fl-full-height" },
                                React.createElement(Layout, { className: "fl-full-height" },
                                    React.createElement(Layout.Content, null,
                                        React.createElement(Card, { bordered: false, extra: canvasMenu, title: canvasTitle, style: { width: "100%", padding: '1px', borderBottom: '1px' }, bodyStyle: { padding: 0 } }),
                                        React.createElement("div", { className: "fl-shadow-sides fl-full-height", style: { backgroundColor: "white", overflow: "auto", paddingBottom: '65px' } },
                                            React.createElement(FormStoreProvider, { formStore: store.formStore }, localStore.hasContent ? React.createElement(FormView, { className: "fl-full-height" }) :
                                                React.createElement(Empty, { description: React.createElement("span", null, "Add a page to this form."), style: { marginTop: "20%" } })))))),
                            React.createElement(React.Suspense, { fallback: "Loading..." },
                                React.createElement(FieldEditorView, null),
                                React.createElement(FormEditorView, null),
                                React.createElement(PageEditorView, null),
                                React.createElement(SectionEditorView, null)))))));
    });
};
