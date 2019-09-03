import { Badge, Button } from "antd";
import * as React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
import { DraggableItem, getBadgeStyle, getItemStyle, DraggableItemList, getItemListStyle } from "./dnd.common";
import { FieldItem } from "./FieldItem";
export const ColumnItem = (props) => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    return React.createElement(Draggable, { type: "Column", draggableId: props.col.uuid, index: props.index }, (provided, snapshot) => (React.createElement(DraggableItem, Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
        React.createElement(Button, { type: "dashed", shape: "circle", onClick: () => store.setEditable(props.col), size: "small", icon: "edit", className: "fl-tree-button" }),
        React.createElement(Badge, Object.assign({ style: { userSelect: 'none' } }, provided.dragHandleProps, { status: snapshot.isDragging ? 'processing' : "default", color: getBadgeStyle("Column"), text: `Column - ${props.col.name}` })),
        React.createElement(Droppable, { droppableId: `${props.col.uuid}|fields`, type: "Field" }, (provided, snapshot) => {
            return React.createElement(DraggableItemList, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps, { style: getItemListStyle(snapshot.isDraggingOver, "Column") }),
                props.col.fields.map((f, index) => {
                    return React.createElement(FieldItem, { key: f.uuid, fld: f, index: index });
                }),
                provided.placeholder);
        }),
        provided.placeholder)));
};
