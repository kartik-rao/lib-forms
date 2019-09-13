import { Tag, Icon, Popconfirm } from "antd";
import * as React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
import { DraggableItem, DraggableItemList, getBadgeStyle, getItemListStyle, getItemStyle } from "./dnd.common";
import { FieldItem } from "./FieldItem";
export const ColumnItem = (props) => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    return React.createElement(Draggable, { type: "Column", draggableId: props.col.uuid, index: props.index }, (provided, snapshot) => (React.createElement(DraggableItem, Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
        React.createElement("span", Object.assign({}, provided.dragHandleProps, { style: { userSelect: 'none' } }),
            React.createElement(Icon, { type: "drag", style: { marginRight: '10px' } }),
            React.createElement(Tag, { style: { cursor: "pointer" }, onClick: () => store.setEditable(props.col), color: getBadgeStyle("Column") }, `Column - ${props.col.name}`),
            React.createElement(Popconfirm, { title: "Delete Column ?", onConfirm: () => store.deleteColumn(props.pageIndex, props.sectionIndex, props.index) },
                React.createElement(Icon, { type: "delete", style: { cursor: "pointer" } }))),
        React.createElement(Droppable, { droppableId: `${props.col.uuid}|fields`, type: "Field" }, (provided, snapshot) => {
            return React.createElement(DraggableItemList, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps, { style: getItemListStyle(snapshot.isDraggingOver, "Column") }),
                props.col.fields.map((f, index) => {
                    return React.createElement(FieldItem, { key: f.uuid, fld: f, pageIndex: props.pageIndex, sectionIndex: props.sectionIndex, columnIndex: props.index, index: index });
                }),
                provided.placeholder);
        }),
        provided.placeholder)));
};
