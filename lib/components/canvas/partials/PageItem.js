var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Badge, Button } from "antd";
import * as React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Container, getBadgeStyle, getItemStyle, ItemList } from "./dnd.common";
import { SectionItem } from "./SectionItem";
import { observer } from "mobx-react";
let PageItem = class PageItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let page = this.props.page;
        let { store } = this.props;
        // Unused but makes view re-render when title etc are changed
        let { title, subtitle, name } = page;
        return (React.createElement("div", { style: { padding: '4px' } },
            React.createElement(Draggable, { type: "Page", draggableId: page.uuid, index: this.props.index }, (provided, snapshot) => (React.createElement(Container, Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
                React.createElement(Button, { type: "dashed", onClick: () => { store.setEditable(page); }, shape: "circle", size: "small", icon: "edit", className: "fl-tree-button" }),
                React.createElement(Badge, Object.assign({}, provided.dragHandleProps, { status: snapshot.isDragging ? 'processing' : "default", color: getBadgeStyle("Page"), text: `Page - ${page.title}` })),
                React.createElement(Droppable, { droppableId: `${page.uuid}|sections`, type: "Section" }, (provided, snapshot) => {
                    return React.createElement(ItemList, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                        page.sections.map((sec, index) => {
                            return React.createElement(SectionItem, { store: this.props.store, key: sec.uuid, sec: sec, index: index });
                        }),
                        provided.placeholder);
                }),
                provided.placeholder)))));
    }
};
PageItem = __decorate([
    observer
], PageItem);
export { PageItem };
