import { Badge, Button } from "antd";
import * as React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
import { ColumnItem } from "./ColumnItem";
import { DraggableItem, getBadgeStyle, getItemStyle, DraggableItemList, getItemListStyle } from "./dnd.common";
export const SectionItem = (props) => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    return React.createElement(Draggable, { type: "Section", draggableId: props.sec.uuid, index: props.index }, (provided, snapshot) => (React.createElement(DraggableItem, Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
        React.createElement(Button, { type: "dashed", shape: "circle", onClick: () => store.setEditable(props.sec), size: "small", icon: "edit", className: "fl-tree-button" }),
        React.createElement(Badge, Object.assign({ style: { userSelect: 'none' } }, provided.dragHandleProps, { status: snapshot.isDragging ? 'processing' : "default", color: getBadgeStyle("Section"), text: `Section - ${props.sec.name}` })),
        React.createElement(Droppable, { droppableId: `${props.sec.uuid}|columns`, type: "Column" }, (provided, snapshot) => {
            return React.createElement(DraggableItemList, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps, { style: getItemListStyle(snapshot.isDraggingOver, "Section") }),
                props.sec.columns.map((col, index) => {
                    return React.createElement(ColumnItem, { key: col.uuid, col: col, index: index });
                }),
                provided.placeholder);
        }),
        provided.placeholder)));
};
