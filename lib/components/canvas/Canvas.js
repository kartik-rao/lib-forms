import { Factory, FormStoreProvider, FormView } from "@kartikrao/lib-forms-core";
import "@kartikrao/lib-forms-core/lib/forms.core.m.css";
import { Badge, Button, Card, Col, Empty, Icon, Layout } from 'antd';
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { editorStoreContext } from "../../store/EditorStoreProvider";
import { ComponentMenu } from "./ComponentMenu";
import { ComponentTree } from "./ComponentTree";
import { CanvasMenu } from "./partials/CanvasMenu";
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
                store.pushUndoState(`Added page at position [${nextPageNum}]`);
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
                    store.pushUndoState(`Added section to page [${page.name}]`);
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
                    store.pushUndoState(`Added column to section [${section.name}]`);
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
                    store.pushUndoState(`Added field [${result.draggableId}] to column [${column.name}]`);
                    column.addField(field, dIndex);
                }
            }
            return;
        },
        handleMoveItem: function (result) {
            const { source, destination, type } = result;
            const { form } = store.formStore;
            const sIndex = source.index;
            const dIndex = destination.index;
            if (type == "Page") {
                store.pushUndoState(`Moved page from position [${source.index + 1}] to [${destination.index + 1}]`);
                form.swapPages(source.index, destination.index);
            }
            else {
                let [sParentId] = source.droppableId.split('|');
                let [dParentId] = destination.droppableId.split('|');
                let sameParent = sParentId == dParentId;
                if (type == "Section") {
                    let prev = this.itemMap[sParentId];
                    if (sameParent) {
                        store.pushUndoState(`Moved section from position [${sIndex + 1}] to [${dIndex + 1}]`);
                        prev.swapSections(sIndex, dIndex);
                    }
                    else {
                        let next = this.itemMap[dParentId];
                        let section = prev.sections[sIndex];
                        store.pushUndoState(`Moved section ${section.name} to page [${next.name}] position [${dIndex + 1}]`);
                        prev.removeSection(sIndex);
                        next.addSection(section, dIndex);
                    }
                }
                else if (type == "Column") {
                    let prev = this.itemMap[sParentId];
                    if (sameParent) {
                        store.pushUndoState(`Moved column in section [${prev.name}] from position [${sIndex + 1}] to [${dIndex + 1}]`);
                        prev.swapColumns(sIndex, dIndex);
                    }
                    else {
                        let next = this.itemMap[dParentId];
                        let column = prev.columns[sIndex];
                        store.pushUndoState(`Moved column from section [${prev.name}] to [${next.name}]`);
                        prev.removeColumn(sIndex);
                        next.addColumn(column, dIndex);
                    }
                }
                else if (type == "Field") {
                    let prev = this.itemMap[sParentId];
                    if (sameParent) {
                        store.pushUndoState(`Moved field in column [${prev.name}] from position [${sIndex + 1}] to [${dIndex + 1}]`);
                        prev.swapFields(sIndex, dIndex);
                    }
                    else {
                        let next = this.itemMap[dParentId];
                        let column = prev.fields[sIndex];
                        store.pushUndoState(`Moved field from column [${prev.name}] to [${next.name}]`);
                        prev.removeField(sIndex);
                        next.addField(column, dIndex);
                    }
                }
            }
        },
        onDragEnd: function (result) {
            const { source } = result;
            if (source.droppableId.startsWith('New')) {
                this.handleNewItem(result);
            }
            else {
                this.handleMoveItem(result);
            }
        }
    }));
    const canvasTitle = useObserver(() => {
        return React.createElement("span", null,
            React.createElement(Badge, { status: store.isDirty ? "error" : "success" }),
            "Preview ",
            React.createElement("small", { style: { fontWeight: "normal" } },
                " - ",
                React.createElement("i", null, store.isDirty ? store.changelog[0] : "Unchanged")));
    });
    return useObserver(() => {
        return React.createElement(Layout, { className: "fl-full-height-nopad" },
            React.createElement(Layout.Content, null,
                React.createElement(DragDropContext, { onDragEnd: localStore.onDragEnd },
                    React.createElement(Layout, { className: "fl-full-height-nopad" },
                        React.createElement(CanvasMenu, { onSave: props.onSave, onClose: props.onClose }),
                        React.createElement(Layout.Sider, { trigger: null, collapsed: !store.showPalette, style: { zIndex: 11, background: '#FFFF' }, collapsible: true, theme: "light", collapsedWidth: 0 },
                            React.createElement("div", { className: "fl-full-height fl-grey-box fl-shadow-sides" },
                                React.createElement(ComponentMenu, null))),
                        React.createElement(Content, { style: { overflow: "hidden", padding: '0' } },
                            store.showLayout && React.createElement(Col, { span: 8, className: "fl-full-height" },
                                React.createElement("div", { className: "fl-full-height fl-grey-box fl-shadow-sides" },
                                    React.createElement(ComponentTree, null))),
                            React.createElement(Col, { span: store.previewSpan, className: "fl-full-height fl-grey-box" },
                                React.createElement(Layout, { className: "fl-full-height" },
                                    React.createElement(Layout.Content, null,
                                        React.createElement(Card, { bordered: false, extra: React.createElement(Button, { onClick: () => store.toggleShowCanvasMenu(), size: "small" },
                                                " ",
                                                React.createElement(Icon, { type: "menu" }),
                                                "Menu"), title: canvasTitle, style: { padding: '1px', borderBottom: '1px' }, bodyStyle: { padding: 0 } }),
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
