import { Tag, Icon, Popconfirm } from "antd";
import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
import { DraggableItem, getBadgeStyle, getItemStyle } from "./dnd.common";
export const FieldItem = (props) => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    return React.createElement(Draggable, { type: "Field", draggableId: props.fld.uuid, index: props.index }, (provided, snapshot) => (React.createElement(DraggableItem, Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
        React.createElement("span", Object.assign({}, provided.dragHandleProps, { style: { userSelect: 'none' } }),
            React.createElement(Icon, { type: "drag", style: { marginRight: '10px' } }),
            React.createElement(Tag, { style: { cursor: "pointer" }, onClick: () => store.setEditable(props.fld), color: getBadgeStyle("Field") }, `Field - ${props.fld.label}`),
            React.createElement(Popconfirm, { title: "Delete Field ?", onConfirm: () => store.deleteField(props.pageIndex, props.sectionIndex, props.columnIndex, props.index) },
                React.createElement(Icon, { type: "delete", style: { cursor: "pointer" } }))),
        provided.placeholder)));
};
