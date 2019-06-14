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
import { FieldItem } from "./FieldItem";
import { observer } from "mobx-react";
let ColumnItem = class ColumnItem extends React.Component {
    render() {
        let col = this.props.col;
        let { editorStore } = this.props.store;
        return React.createElement(Draggable, { type: "Column", draggableId: col.uuid, index: this.props.index }, (provided, snapshot) => (React.createElement(Container, Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
            React.createElement(Button, { type: "dashed", shape: "circle", onClick: () => editorStore.setEditable(col), size: "small", icon: "edit", className: "fl-tree-button" }),
            React.createElement(Badge, Object.assign({}, provided.dragHandleProps, { status: snapshot.isDragging ? 'processing' : "default", color: getBadgeStyle("Column"), text: `Column - ${col.name}` })),
            React.createElement(Droppable, { droppableId: `${col.uuid}|fields`, type: "Field" }, (provided, snapshot) => {
                return React.createElement(ItemList, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                    col.fields.map((f, index) => {
                        return React.createElement(FieldItem, { store: this.props.store, key: f.uuid, fld: f, index: index });
                    }),
                    provided.placeholder);
            }),
            provided.placeholder)));
    }
};
ColumnItem = __decorate([
    observer
], ColumnItem);
export { ColumnItem };
