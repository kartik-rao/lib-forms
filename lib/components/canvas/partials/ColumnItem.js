import { Badge, Button } from "antd";
import * as React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
import { Container, getBadgeStyle, getItemStyle, ItemList } from "./dnd.common";
import { FieldItem } from "./FieldItem";
export const ColumnItem = (props) => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    return React.createElement(Draggable, { type: "Column", draggableId: props.col.uuid, index: props.index }, (provided, snapshot) => (React.createElement(Container, Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
        React.createElement(Button, { type: "dashed", shape: "circle", onClick: () => store.setEditable(props.col), size: "small", icon: "edit", className: "fl-tree-button" }),
        React.createElement(Badge, Object.assign({}, provided.dragHandleProps, { status: snapshot.isDragging ? 'processing' : "default", color: getBadgeStyle("Column"), text: `Column - ${props.col.name}` })),
        React.createElement(Droppable, { droppableId: `${props.col.uuid}|fields`, type: "Field" }, (provided, snapshot) => {
            return React.createElement(ItemList, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                props.col.fields.map((f, index) => {
                    return React.createElement(FieldItem, { key: f.uuid, fld: f, index: index });
                }),
                provided.placeholder);
        }),
        provided.placeholder)));
};
// @observer
// export class ColumnItemOld extends React.Component<IColumnItemProps, any> {
//     render() {
//         let col = this.props.col;
//         let {store} = this.props;
//         return <Draggable type="Column" draggableId={col.uuid} index={this.props.index}>
//         {(provided, snapshot) => (
//           <Container ref={provided.innerRef} {...provided.draggableProps}
//             style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
//             <Button type="dashed" shape="circle" onClick={() => store.setEditable(col)} size="small" icon="edit" className="fl-tree-button"></Button>
//             <Badge {...provided.dragHandleProps} status={snapshot.isDragging ? 'processing': "default"} color={getBadgeStyle("Column")} text={`Column - ${col.name}`}/>
//                 <Droppable droppableId={`${col.uuid}|fields`} type="Field">
//                     {(provided, snapshot) => {
//                         return <ItemList isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
//                             {col.fields.map((f: Field, index) => {
//                                 return <FieldItem store={this.props.store} key={f.uuid} fld={f} index={index}></FieldItem>
//                             })}
//                         {provided.placeholder}
//                         </ItemList>
//                     }}
//                 </Droppable>
//             {provided.placeholder}
//           </Container>
//         )}
//       </Draggable>
//     }
// }
