import { Badge, Button } from "antd";
import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
import { Container, getBadgeStyle, getItemStyle } from "./dnd.common";
export const FieldItem = (props) => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    return React.createElement(Draggable, { type: "Field", draggableId: props.fld.uuid, index: props.index }, (provided, snapshot) => (React.createElement(Container, Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
        React.createElement(Button, { type: "dashed", shape: "circle", onClick: () => store.setEditable(props.fld), size: "small", icon: "edit", className: "fl-tree-button" }),
        React.createElement(Badge, Object.assign({}, provided.dragHandleProps, { status: snapshot.isDragging ? 'processing' : "default", color: getBadgeStyle("Field"), text: `Field - ${props.fld.label}` })),
        provided.placeholder)));
};
