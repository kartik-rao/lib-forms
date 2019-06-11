import Field from "@kartikrao/lib-forms-core/lib/models/field";
import { Badge } from "antd";
import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import RootStore from "../../../store/RootStore";
import { Container, getBadgeStyle, getItemStyle } from "./dnd.common";

export interface IFieldItemProps {
    fld: Field;
    key: string;
    index: number;
    store: RootStore;
}

export class FieldItem extends React.Component<IFieldItemProps, any> {
    render() {
        let fld: Field = this.props.fld;
        return <Draggable type="Field" draggableId={fld.uuid} index={this.props.index}>
            {(provided, snapshot) => (
                <Container ref={provided.innerRef} {...provided.draggableProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                    <Badge {...provided.dragHandleProps} status={snapshot.isDragging ? 'processing': "default"} color={getBadgeStyle("Field")} text={`Field - ${fld.label}`}/>
                    {provided.placeholder}
                </Container>
        )}
      </Draggable>
    }
}