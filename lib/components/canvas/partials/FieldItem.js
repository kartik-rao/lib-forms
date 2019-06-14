var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Badge, Button } from "antd";
import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Container, getBadgeStyle, getItemStyle } from "./dnd.common";
import { observer } from "mobx-react";
let FieldItem = class FieldItem extends React.Component {
    render() {
        let fld = this.props.fld;
        let label = fld.label; // Otherwise Tree wont update
        let { editorStore } = this.props.store;
        return React.createElement(Draggable, { type: "Field", draggableId: fld.uuid, index: this.props.index }, (provided, snapshot) => (React.createElement(Container, Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
            React.createElement(Button, { type: "dashed", shape: "circle", onClick: () => editorStore.setEditable(fld), size: "small", icon: "edit", className: "fl-tree-button" }),
            React.createElement(Badge, Object.assign({}, provided.dragHandleProps, { status: snapshot.isDragging ? 'processing' : "default", color: getBadgeStyle("Field"), text: `Field - ${label}` })),
            provided.placeholder)));
    }
};
FieldItem = __decorate([
    observer
], FieldItem);
export { FieldItem };
