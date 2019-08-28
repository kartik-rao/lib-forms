import { Column, Section } from "@kartikrao/lib-forms-core";
import { Badge, Button } from "antd";
import * as React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
import { ColumnItem } from "./ColumnItem";
import { Container, getBadgeStyle, getItemStyle, ItemList } from "./dnd.common";

export interface ISectionItemProps {
    sec: Section;
    key: string;
    index: number;
}

export const SectionItem: React.FC<ISectionItemProps> = (props) => {
    const store = React.useContext(editorStoreContext);
    if(!store) throw new Error("Store is null");
    return <Draggable type="Section" draggableId={props.sec.uuid} index={props.index}>
        {(provided, snapshot) => (
          <Container ref={provided.innerRef} {...provided.draggableProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
              <Button type="dashed" shape="circle" onClick={() => store.setEditable(props.sec)} size="small" icon="edit" className="fl-tree-button"></Button>
              <Badge {...provided.dragHandleProps} status={snapshot.isDragging ? 'processing': "default"} color={getBadgeStyle("Section")} text={`Section - ${props.sec.name}`}/>
                <Droppable droppableId={`${props.sec.uuid}|columns`} type="Column">
                {(provided, snapshot) => {
                    return <ItemList isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
                        {props.sec.columns.map((col: Column, index) => {
                            return <ColumnItem key={col.uuid} col={col} index={index}></ColumnItem>
                        })}
                    { provided.placeholder}
                    </ItemList>
                }}
            </Droppable>
            {provided.placeholder}
          </Container>
        )}
      </Draggable>
}

// @observer
// export class SectionItemOld extends React.Component<ISectionItemProps, any> {
//     render() {
//         let sec = this.props.sec;
//         let {store} = this.props;
//         return <Draggable type="Section" draggableId={sec.uuid} index={this.props.index}>
//         {(provided, snapshot) => (
//           <Container ref={provided.innerRef} {...provided.draggableProps}
//           style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
//               <Button type="dashed" shape="circle" onClick={() => store.setEditable(sec)} size="small" icon="edit" className="fl-tree-button"></Button>
//               <Badge {...provided.dragHandleProps} status={snapshot.isDragging ? 'processing': "default"} color={getBadgeStyle("Section")} text={`Section - ${sec.name}`}/>
//                 <Droppable droppableId={`${sec.uuid}|columns`} type="Column">
//                 {(provided, snapshot) => {
//                     return <ItemList isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
//                         {sec.columns.map((col: Column, index) => {
//                             return <ColumnItem store={this.props.store} key={col.uuid} col={col} index={index}></ColumnItem>
//                         })}
//                     { provided.placeholder}
//                     </ItemList>
//                 }}

//             </Droppable>
//             {provided.placeholder}
//           </Container>
//         )}
//       </Draggable>
//     }
// }