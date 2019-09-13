import { Field } from "@kartikrao/lib-forms-core";
import { Button, Tag, Icon, Popconfirm } from "antd";
import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
import { DraggableItem, getBadgeStyle, getItemStyle } from "./dnd.common";

export interface IFieldItemProps {
    fld: Field;
    key: string;
    index: number;
    pageIndex: number;
    sectionIndex: number;
    columnIndex: number;
}

export const FieldItem: React.FC<IFieldItemProps> = (props) => {
    const store = React.useContext(editorStoreContext);
    if(!store) throw new Error("Store is null");

    return <Draggable type="Field" draggableId={props.fld.uuid} index={props.index}>
    {(provided, snapshot) => (
        <DraggableItem ref={provided.innerRef} {...provided.draggableProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
            <span {...provided.dragHandleProps} style={{userSelect: 'none'}}>
                <Icon type="drag" style={{marginRight: '10px'}}/>
                <Tag style={{cursor: "pointer"}} onClick={()=>store.setEditable(props.fld)} color={getBadgeStyle("Field")}>{`Field - ${props.fld.label}`}</Tag>
                <Popconfirm title="Delete Field ?" onConfirm={() => store.deleteField(props.pageIndex, props.sectionIndex, props.columnIndex, props.index)}><Icon type="delete" style={{cursor: "pointer"}}/></Popconfirm>
            </span>
            {provided.placeholder}
        </DraggableItem>
    )}
    </Draggable>
}
