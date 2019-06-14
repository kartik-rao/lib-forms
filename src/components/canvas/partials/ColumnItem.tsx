import {Column, Field} from "@kartikrao/lib-forms-core";

import { Badge, Button } from "antd";
import * as React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import {RootStore} from "../../../store/RootStore";
import { Container, getBadgeStyle, getItemStyle, ItemList } from "./dnd.common";
import { FieldItem } from "./FieldItem";
import { observer } from "mobx-react";

export interface IColumnItemProps {
    col: Column;
    key: string;
    index: number;
    store: RootStore;
}

@observer
export class ColumnItem extends React.Component<IColumnItemProps, any> {
    render() {
        let col = this.props.col;
        let {editorStore} = this.props.store;
        return <Draggable type="Column" draggableId={col.uuid} index={this.props.index}>
        {(provided, snapshot) => (
          <Container ref={provided.innerRef} {...provided.draggableProps}
            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
            <Button type="dashed" shape="circle" onClick={() => editorStore.setEditable(col)} size="small" icon="edit" className="fl-tree-button"></Button>
            <Badge {...provided.dragHandleProps} status={snapshot.isDragging ? 'processing': "default"} color={getBadgeStyle("Column")} text={`Column - ${col.name}`}/>
                <Droppable droppableId={`${col.uuid}|fields`} type="Field">
                    {(provided, snapshot) => {
                        return <ItemList isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
                            {col.fields.map((f: Field, index) => {
                                return <FieldItem store={this.props.store} key={f.uuid} fld={f} index={index}></FieldItem>
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
}