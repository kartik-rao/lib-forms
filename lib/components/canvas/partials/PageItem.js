import { Tag, Icon } from "antd";
import * as React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
import { DraggableItem, DraggableItemList, getBadgeStyle, getItemListStyle, getItemStyle } from "./dnd.common";
import { SectionItem } from "./SectionItem";
export const PageItem = (props) => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    let { title, subtitle, name } = props.page;
    return React.createElement(Draggable, { type: "Page", draggableId: props.page.uuid, index: props.index }, (provided, snapshot) => (React.createElement(DraggableItem, Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
        React.createElement("span", Object.assign({}, provided.dragHandleProps, { style: { userSelect: 'none' } }),
            React.createElement(Icon, { type: "drag", style: { marginRight: '10px' } }),
            React.createElement(Tag, { style: { cursor: "pointer" }, onClick: () => store.setEditable(props.page), color: getBadgeStyle("Page") }, `Page - ${props.page.title}`)),
        React.createElement(Droppable, { droppableId: `${props.page.uuid}|sections`, type: "Section" }, (provided, snapshot) => {
            return React.createElement(DraggableItemList, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps, { style: getItemListStyle(snapshot.isDraggingOver, "Page") }),
                props.page.sections.map((sec, index) => {
                    return React.createElement(SectionItem, { key: sec.uuid, sec: sec, index: index, pageIndex: props.index });
                }),
                provided.placeholder);
        }),
        provided.placeholder)));
};
