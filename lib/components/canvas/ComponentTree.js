var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Card, Divider, Button, Badge } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { Droppable } from "react-beautiful-dnd";
import { ItemList, getBadgeStyle } from "./partials/dnd.common";
import { PageItem } from "./partials/PageItem";
let ComponentTree = class ComponentTree extends React.Component {
    constructor(props) {
        super(props);
        this.nodeMap = {};
        this.props = props;
    }
    render() {
        let { formStore, editorStore } = this.props.store;
        let { form } = formStore;
        let { pages } = form.content;
        return React.createElement(Card, { title: "Layout", bordered: false, style: { height: '100%' }, bodyStyle: { height: '100%', padding: '10px', overflow: 'auto', paddingBottom: '48px' } },
            React.createElement(Button, { type: "dashed", onClick: () => { editorStore.setFormEditorVisible(true); }, shape: "circle", size: "small", icon: "edit", style: { marginRight: '5px', userSelect: 'none' } }),
            React.createElement(Badge, { status: "default", color: getBadgeStyle("Form"), text: `Form - ${form.name}` }),
            React.createElement(Droppable, { droppableId: "pages", type: "Page" }, (provided, snapshot) => {
                return React.createElement(ItemList, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                    pages.map((page, index) => {
                        return React.createElement("div", { key: page.uuid },
                            React.createElement(PageItem, { store: this.props.store, key: page.uuid, page: page, index: index }),
                            React.createElement(Divider, { style: { margin: '12px 0' } }));
                    }),
                    provided.placeholder);
            }));
    }
};
ComponentTree = __decorate([
    observer
], ComponentTree);
export { ComponentTree };
