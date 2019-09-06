import { Field } from "@kartikrao/lib-forms-core";
import { Badge, Button } from "antd";
import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
import { DraggableItem, getBadgeStyle, getItemStyle } from "./dnd.common";

export interface IFieldItemProps {
    fld: Field;
    key: string;
    index: number;
}

export const FieldItem: React.FC<IFieldItemProps> = (props) => {
    const store = React.useContext(editorStoreContext);
    if(!store) throw new Error("Store is null");
    return <Draggable type="Field" draggableId={props.fld.uuid} index={props.index}>
    {(provided, snapshot) => (
        <DraggableItem ref={provided.innerRef} {...provided.draggableProps}
                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
            <Button type="dashed" shape="circle" onClick={() => store.setEditable(props.fld)} title={`Edit ${props.fld.name||"Field"}`} size="small" icon="edit" className="fl-tree-button"></Button>
            <Badge style={{userSelect: 'none'}} {...provided.dragHandleProps} status={snapshot.isDragging ? 'processing': "default"} color={getBadgeStyle("Field")} text={`Field - ${props.fld.label}`}/>
            {provided.placeholder}
        </DraggableItem>
    )}
    </Draggable>
}
