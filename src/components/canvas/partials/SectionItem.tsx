import { Column, Section } from "@kartikrao/lib-forms-core";
import { Button, Tag, Icon } from "antd";
import * as React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
import { ColumnItem } from "./ColumnItem";
import { DraggableItem, DraggableItemList, getBadgeStyle, getItemListStyle, getItemStyle } from "./dnd.common";

export interface ISectionItemProps {
    sec: Section;
    key: string;
    index: number;
    pageIndex: number;
}

export const SectionItem: React.FC<ISectionItemProps> = (props) => {
    const store = React.useContext(editorStoreContext);
    if(!store) throw new Error("Store is null");

    return <Draggable type="Section" draggableId={props.sec.uuid} index={props.index}>
        {(provided, snapshot) => (
        <DraggableItem ref={provided.innerRef} {...provided.draggableProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
            <span {...provided.dragHandleProps} style={{userSelect: 'none'}}>
                <Icon type="drag" style={{marginRight: '10px'}}/>
                <Tag style={{cursor: "pointer"}} onClick={()=>store.setEditable(props.sec)} color={getBadgeStyle("Section")}>{`Section - ${props.sec.name}`}</Tag>
            </span>
                <Droppable droppableId={`${props.sec.uuid}|columns`} type="Column">
                {(provided, snapshot) => {
                    return <DraggableItemList isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps} style={getItemListStyle(snapshot.isDraggingOver, "Section")}>
                        {props.sec.columns.map((col: Column, index) => {
                            return <ColumnItem key={col.uuid} col={col} pageIndex={props.pageIndex} sectionIndex={props.index} index={index}></ColumnItem>
                        })}
                    { provided.placeholder}
                    </DraggableItemList>
                }}
            </Droppable>
            {provided.placeholder}
        </DraggableItem>
        )}
      </Draggable>
}
