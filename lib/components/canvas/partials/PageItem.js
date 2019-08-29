import { Badge, Button } from "antd";
import * as React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
import { Container, getBadgeStyle, getItemStyle, ItemList } from "./dnd.common";
import { SectionItem } from "./SectionItem";
export const PageItem = (props) => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    // let page: Page = this.props.page;
    // Unused but makes view re-render when title etc are changed
    let { title, subtitle, name } = props.page;
    return (React.createElement("div", { style: { padding: '4px' } },
        React.createElement(Draggable, { type: "Page", draggableId: props.page.uuid, index: props.index }, (provided, snapshot) => (React.createElement(Container, Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
            React.createElement(Button, { type: "dashed", onClick: () => { store.setEditable(props.page); }, shape: "circle", size: "small", icon: "edit", className: "fl-tree-button" }),
            React.createElement(Badge, Object.assign({}, provided.dragHandleProps, { status: snapshot.isDragging ? 'processing' : "default", color: getBadgeStyle("Page"), text: `Page - ${props.page.title}` })),
            React.createElement(Droppable, { droppableId: `${props.page.uuid}|sections`, type: "Section" }, (provided, snapshot) => {
                return React.createElement(ItemList, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                    props.page.sections.map((sec, index) => {
                        return React.createElement(SectionItem, { key: sec.uuid, sec: sec, index: index });
                    }),
                    provided.placeholder);
            }),
            provided.placeholder)))));
};
// @observer
// export class PageItemOld extends React.Component<IPageItemProps, any> {
//     constructor(props: IPageItemProps) {
//         super(props);
//     }
//     render() {
//         let page: Page = this.props.page;
//         let {store} = this.props;
//         // Unused but makes view re-render when title etc are changed
//         let {title, subtitle, name} = page;
//         return ( <div style={{padding: '4px'}}>
//             <Draggable type="Page" draggableId={page.uuid} index={this.props.index}>
//             {(provided, snapshot) => (
//                 <Container ref={provided.innerRef} {...provided.draggableProps}
//                 style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
//                     <Button type="dashed" onClick={() => {store.setEditable(page)}} shape="circle" size="small" icon="edit" className="fl-tree-button"></Button>
//                     <Badge {...provided.dragHandleProps} status={snapshot.isDragging ? 'processing': "default"} color={getBadgeStyle("Page")} text={`Page - ${page.title}`}/>
//                     <Droppable droppableId={`${page.uuid}|sections`} type="Section">
//                         {(provided, snapshot) => {
//                             return <ItemList isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
//                                 {page.sections.map((sec: Section, index) => {
//                                     return <SectionItem store={this.props.store} key={sec.uuid} sec={sec} index={index}></SectionItem>
//                                 })}
//                             {provided.placeholder}
//                             </ItemList>
//                         }}
//                     </Droppable>
//                 {provided.placeholder}
//               </Container>
//             )}
//         </Draggable>
//         </div>
//         )
//     }
// }
