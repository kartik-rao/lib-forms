import { Column, Field } from "@kartikrao/lib-forms-core";
import { Badge, Button } from "antd";
import * as React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
import { Container, getBadgeStyle, getItemStyle, ItemList } from "./dnd.common";
import { FieldItem } from "./FieldItem";


export interface IColumnItemProps {
    col: Column;
    key: string;
    index: number;
}

export const ColumnItem: React.FC<IColumnItemProps> = (props) => {
    const store = React.useContext(editorStoreContext);
    if(!store) throw new Error("Store is null");
    return <Draggable type="Column" draggableId={props.col.uuid} index={props.index}>
        {(provided, snapshot) => (
          <Container ref={provided.innerRef} {...provided.draggableProps}
            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
            <Button type="dashed" shape="circle" onClick={() => store.setEditable(props.col)} size="small" icon="edit" className="fl-tree-button"></Button>
            <Badge {...provided.dragHandleProps} status={snapshot.isDragging ? 'processing': "default"} color={getBadgeStyle("Column")} text={`Column - ${props.col.name}`}/>
                <Droppable droppableId={`${props.col.uuid}|fields`} type="Field">
                    {(provided, snapshot) => {
                        return <ItemList isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
                            {props.col.fields.map((f: Field, index) => {
                                return <FieldItem key={f.uuid} fld={f} index={index}></FieldItem>
                            })}
                        {provided.placeholder}
                        </ItemList>
                    }}
                </Droppable>
            {provided.placeholder}
          </Container>
        )}
      </Draggable>
}