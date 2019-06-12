import Field from "@kartikrao/lib-forms-core/lib/models/field";
import { Badge, Button } from "antd";
import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import RootStore from "../../../store/RootStore";
import { Container, getBadgeStyle, getItemStyle } from "./dnd.common";
import { observer } from "mobx-react";

export interface IFieldItemProps {
    fld: Field;
    key: string;
    index: number;
    store: RootStore;
}

@observer
export class FieldItem extends React.Component<IFieldItemProps, any> {
    render() {
        let fld: Field = this.props.fld;
        let label = fld.label; // Otherwise Tree wont update
        let {editorStore} = this.props.store;
        return <Draggable type="Field" draggableId={fld.uuid} index={this.props.index}>
            {(provided, snapshot) => (
                <Container ref={provided.innerRef} {...provided.draggableProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                    <Button shape="circle" onClick={() => editorStore.setEditable(fld)} size="small" icon="edit" style={{marginRight: '5px', userSelect: 'none'}}></Button>
                    <Badge {...provided.dragHandleProps} status={snapshot.isDragging ? 'processing': "default"} color={getBadgeStyle("Field")} text={`Field - ${label}`}/>
                    {provided.placeholder}
                </Container>
        )}
      </Draggable>
    }
}