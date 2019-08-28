import { Field } from "@kartikrao/lib-forms-core";
import { Badge, Button } from "antd";
import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
import { Container, getBadgeStyle, getItemStyle } from "./dnd.common";

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
        <Container ref={provided.innerRef} {...provided.draggableProps}
                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
            <Button type="dashed" shape="circle" onClick={() => store.setEditable(props.fld)} size="small" icon="edit" className="fl-tree-button"></Button>
            <Badge {...provided.dragHandleProps} status={snapshot.isDragging ? 'processing': "default"} color={getBadgeStyle("Field")} text={`Field - ${props.fld.label}`}/>
            {provided.placeholder}
        </Container>
    )}
    </Draggable>

}

// @observer
// export class FieldItemOld extends React.Component<IFieldItemProps, any> {
//     render() {
//         let fld: Field = this.props.fld;
//         let label = fld.label; // Otherwise Tree wont update
//         let {store} = this.props;
//         return <Draggable type="Field" draggableId={fld.uuid} index={this.props.index}>
//             {(provided, snapshot) => (
//                 <Container ref={provided.innerRef} {...provided.draggableProps}
//                         style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
//                     <Button type="dashed" shape="circle" onClick={() => store.setEditable(fld)} size="small" icon="edit" className="fl-tree-button"></Button>
//                     <Badge {...provided.dragHandleProps} status={snapshot.isDragging ? 'processing': "default"} color={getBadgeStyle("Field")} text={`Field - ${label}`}/>
//                     {provided.placeholder}
//                 </Container>
//         )}
//       </Draggable>
//     }
// }