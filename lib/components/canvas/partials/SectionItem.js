import { Tag, Icon, Popconfirm } from "antd";
import * as React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
import { ColumnItem } from "./ColumnItem";
import { DraggableItem, DraggableItemList, getBadgeStyle, getItemListStyle, getItemStyle } from "./dnd.common";
export const SectionItem = (props) => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    return React.createElement(Draggable, { type: "Section", draggableId: props.sec.uuid, index: props.index }, (provided, snapshot) => (React.createElement(DraggableItem, Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
        React.createElement("span", Object.assign({}, provided.dragHandleProps, { style: { userSelect: 'none' } }),
            React.createElement(Icon, { type: "drag", style: { marginRight: '10px' } }),
            React.createElement(Tag, { style: { cursor: "pointer" }, onClick: () => store.setEditable(props.sec), color: getBadgeStyle("Section") }, `Section - ${props.sec.name}`),
            React.createElement(Popconfirm, { title: "Delete Section ?", onConfirm: () => store.deleteSection(props.pageIndex, props.index) },
                React.createElement(Icon, { type: "delete", style: { cursor: "pointer" } }))),
        React.createElement(Droppable, { droppableId: `${props.sec.uuid}|columns`, type: "Column" }, (provided, snapshot) => {
            return React.createElement(DraggableItemList, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps, { style: getItemListStyle(snapshot.isDraggingOver, "Section") }),
                props.sec.columns.map((col, index) => {
                    return React.createElement(ColumnItem, { key: col.uuid, col: col, pageIndex: props.pageIndex, sectionIndex: props.index, index: index });
                }),
                provided.placeholder);
        }),
        provided.placeholder)));
};
