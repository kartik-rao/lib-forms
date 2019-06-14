var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Factory } from "@kartikrao/lib-forms-core/lib/models/factory";
import { FormView } from "@kartikrao/lib-forms-core/lib/views/FormView";
import { Col, Icon, Layout, Menu } from 'antd';
import { computed } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { FieldEditorView } from "../editors/field/FieldEditorView";
import { FormEditorView } from "../editors/form/FormEditorView";
import PageEditorView from "../editors/page/PageEditorView";
import { ComponentMenu } from "./ComponentMenu";
import { ComponentTree } from "./ComponentTree";
const { Content } = Layout;
const genRandom = () => {
    return `${Math.ceil(Math.random() * 1e6)}`;
};
let Canvas = class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.handleNewItem = (result) => {
            const { destination, type } = result;
            const { form } = this.props.store.formStore;
            const dIndex = destination.index;
            let id = genRandom();
            if (type == "Page") {
                let nextPageNum = form.content.pages.length;
                let page = this.factory.makePages({
                    id: `${nextPageNum}`,
                    title: `Page ${nextPageNum}`,
                    name: `Page ${nextPageNum}`,
                    sections: []
                })[0];
                form.addPage(page, dIndex);
            }
            else {
                let [dParentId] = destination.droppableId.split('|');
                if (type == "Section") {
                    let page = this.itemMap[dParentId];
                    let section = this.factory.makeSections({
                        id: `${id}`,
                        name: `Section_${id}`,
                        columns: []
                    })[0];
                    page.addSection(section, dIndex);
                }
                if (type == "Column") {
                    let section = this.itemMap[dParentId];
                    let column = this.factory.makeColumns({
                        id: `${id}`,
                        name: `Column_${id}`,
                        fields: []
                    })[0];
                    section.addColumn(column, dIndex);
                }
                if (type == "Field") {
                    let column = this.itemMap[dParentId];
                    let field = this.factory.makeFields({
                        id: `${id}`,
                        name: `Field_${id}`,
                        label: `Untitled ${result.draggableId}`,
                        inputType: result.draggableId,
                        componentProps: {},
                        fieldOptions: {}
                    })[0];
                    column.addField(field, dIndex);
                }
            }
            return;
        };
        this.handleMoveItem = (result) => {
            const { source, destination, type } = result;
            const { form } = this.props.store.formStore;
            const sIndex = source.index;
            const dIndex = destination.index;
            if (type == "Page") {
                form.swapPages(source.index, destination.index);
            }
            else {
                let [sParentId] = source.droppableId.split('|');
                let [dParentId] = destination.droppableId.split('|');
                let sameParent = sParentId == dParentId;
                if (type == "Section") {
                    let prev = this.itemMap[sParentId];
                    if (sameParent) {
                        prev.swapSections(sIndex, dIndex);
                        return;
                    }
                    let next = this.itemMap[dParentId];
                    let section = prev.sections[sIndex];
                    prev.removeSection(sIndex);
                    next.addSection(section, dIndex);
                }
                else if (type == "Column") {
                    let prev = this.itemMap[sParentId];
                    if (sameParent) {
                        prev.swapColumns(sIndex, dIndex);
                        return;
                    }
                    let next = this.itemMap[dParentId];
                    let column = prev.columns[sIndex];
                    prev.removeColumn(sIndex);
                    next.addColumn(column, dIndex);
                }
                else if (type == "Field") {
                    let prev = this.itemMap[sParentId];
                    if (sameParent) {
                        prev.swapFields(sIndex, dIndex);
                        return;
                    }
                    let next = this.itemMap[dParentId];
                    let column = prev.fields[sIndex];
                    prev.removeField(sIndex);
                    next.addField(column, dIndex);
                }
            }
        };
        this.onDragEnd = (result) => {
            const { source, type } = result;
            if (source.droppableId.startsWith('New')) {
                this.handleNewItem(result);
            }
            else {
                this.handleMoveItem(result);
            }
        };
        this.state = {
            siderCollapsed: false
        };
        this.onSiderCollapse = (siderCollapsed) => {
            this.setState({ siderCollapsed });
        };
        this.toggleSider = () => {
            this.setState({ siderCollapsed: !this.state.siderCollapsed });
        };
        this.factory = new Factory(this.props.store.formStore);
    }
    get itemMap() {
        let { form } = this.props.store.formStore;
        let { pages } = form.content;
        let itemMap = {};
        pages.forEach((p) => {
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
    }
    render() {
        let { formStore } = this.props.store;
        return React.createElement(Layout, { className: "fl-full-height-nopad" },
            React.createElement(Menu, { mode: "horizontal", theme: "light", multiple: true, className: "fl-shadow-sides" },
                React.createElement(Menu.Item, { title: "Form Controls", onClick: this.toggleSider, key: "controls" },
                    React.createElement(Icon, { theme: this.state.siderCollapsed ? 'outlined' : 'filled', type: "control" }))),
            React.createElement(Layout.Content, null,
                React.createElement(DragDropContext, { onDragEnd: this.onDragEnd },
                    React.createElement(Layout, { className: "fl-full-height-nopad" },
                        React.createElement(Layout.Sider, { trigger: null, collapsed: this.state.siderCollapsed, style: { zIndex: 11 }, collapsible: true, onCollapse: this.onSiderCollapse, theme: "light", collapsedWidth: 0 },
                            React.createElement("div", { className: "fl-full-height fl-grey-box fl-shadow-sides" },
                                React.createElement(ComponentMenu, null))),
                        React.createElement(Content, { style: { overflow: "hidden", padding: '0' } },
                            React.createElement(Col, { span: 8, style: { height: '100%' } },
                                React.createElement("div", { className: "fl-full-height fl-grey-box fl-shadow-sides" },
                                    React.createElement(ComponentTree, { store: this.props.store }))),
                            React.createElement(Col, { span: 16, style: { height: '100%' } },
                                React.createElement("div", { className: "fl-grey-box fl-shadow-sides fl-full-height" },
                                    React.createElement(FormView, { store: formStore }))),
                            React.createElement(FieldEditorView, { store: this.props.store }),
                            React.createElement(FormEditorView, { store: this.props.store }),
                            React.createElement(PageEditorView, { store: this.props.store }))))));
    }
};
__decorate([
    computed
], Canvas.prototype, "itemMap", null);
Canvas = __decorate([
    observer
], Canvas);
export { Canvas };
