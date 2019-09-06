import { Column, Field } from "@kartikrao/lib-forms-core";
import { Button, Tag, Icon } from "antd";
import * as React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
import { DraggableItem, DraggableItemList, getBadgeStyle, getItemListStyle, getItemStyle } from "./dnd.common";
import { FieldItem } from "./FieldItem";


export interface IColumnItemProps {
    col: Column;
    key: string;
    index: number;
    pageIndex: number;
    sectionIndex: number;
}

export const ColumnItem: React.FC<IColumnItemProps> = (props) => {
    const store = React.useContext(editorStoreContext);
    if(!store) throw new Error("Store is null");
    return <Draggable type="Column" draggableId={props.col.uuid} index={props.index}>
        {(provided, snapshot) => (
        <DraggableItem ref={provided.innerRef} {...provided.draggableProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
            <span {...provided.dragHandleProps} style={{userSelect: 'none'}}>
                <Icon type="drag" style={{marginRight: '10px'}}/>
                <Tag style={{cursor: "pointer"}} onClick={()=>store.setEditable(props.col)} color={getBadgeStyle("Column")}>{`Column - ${props.col.name}`}</Tag>
            </span>
            <Droppable droppableId={`${props.col.uuid}|fields`} type="Field">
                {(provided, snapshot) => {
                    return <DraggableItemList isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps} style={getItemListStyle(snapshot.isDraggingOver, "Column")}>
                        {props.col.fields.map((f: Field, index) => {
                            return <FieldItem key={f.uuid} fld={f} pageIndex={props.pageIndex} sectionIndex={props.sectionIndex} columnIndex={props.index} index={index}></FieldItem>
                        })}
                    {provided.placeholder}
                    </DraggableItemList>
                }}
            </Droppable>
            {provided.placeholder}
          </DraggableItem>
        )}
      </Draggable>
}