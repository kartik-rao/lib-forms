import { Page } from "@kartikrao/lib-forms-core";
import { Badge, Button, Card, Divider, Tag } from "antd";
import { useObserver } from "mobx-react";
import * as React from "react";
import { Droppable } from "react-beautiful-dnd";
import { editorStoreContext } from "../../store/EditorStoreProvider";
import { getBadgeStyle, DraggableItemList, getItemListStyle } from "./partials/dnd.common";
import { PageItem } from "./partials/PageItem";

export const ComponentTree: React.FC<any> = () => {
    const store = React.useContext(editorStoreContext);
    if(!store) throw new Error("Store is null");

    return useObserver(() => {
        return <Card title={"Layout"} bordered={false} style={{height: '100%'}} bodyStyle={{height:'100%', padding: '10px', overflow: 'auto', paddingBottom:'48px'}}>
        <Tag style={{cursor: "pointer"}} onClick={()=>store.setFormEditorVisible(true)} color={getBadgeStyle("Form")}>{`Form - ${store.formStore.form.name}`}</Tag>
        <Droppable droppableId="pages" type="Page">
            {(provided, snapshot) => {
                return <DraggableItemList isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} style={getItemListStyle(snapshot.isDraggingOver, "Form")}>
                    { store.formStore.form.content.pages.map((page: Page, index) => {
                        return <><PageItem key={page.uuid} page={page} index={index}></PageItem></>
                    })}
                {provided.placeholder}
                </DraggableItemList>
            }}
        </Droppable>
        </Card>
    });
};