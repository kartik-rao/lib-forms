var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Badge, Button } from "antd";
import * as React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ColumnItem } from "./ColumnItem";
import { Container, getBadgeStyle, getItemStyle, ItemList } from "./dnd.common";
import { observer } from "mobx-react";
let SectionItem = class SectionItem extends React.Component {
    render() {
        let sec = this.props.sec;
        let { store } = this.props;
        return React.createElement(Draggable, { type: "Section", draggableId: sec.uuid, index: this.props.index }, (provided, snapshot) => (React.createElement(Container, Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
            React.createElement(Button, { type: "dashed", shape: "circle", onClick: () => store.setEditable(sec), size: "small", icon: "edit", className: "fl-tree-button" }),
            React.createElement(Badge, Object.assign({}, provided.dragHandleProps, { status: snapshot.isDragging ? 'processing' : "default", color: getBadgeStyle("Section"), text: `Section - ${sec.name}` })),
            React.createElement(Droppable, { droppableId: `${sec.uuid}|columns`, type: "Column" }, (provided, snapshot) => {
                return React.createElement(ItemList, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                    sec.columns.map((col, index) => {
                        return React.createElement(ColumnItem, { store: this.props.store, key: col.uuid, col: col, index: index });
                    }),
                    provided.placeholder);
            }),
            provided.placeholder)));
    }
};
SectionItem = __decorate([
    observer
], SectionItem);
export { SectionItem };
