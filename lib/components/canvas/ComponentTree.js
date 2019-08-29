import { Badge, Button, Card, Divider } from "antd";
import { useObserver } from "mobx-react";
import * as React from "react";
import { Droppable } from "react-beautiful-dnd";
import { editorStoreContext } from "../../store/EditorStoreProvider";
import { getBadgeStyle, ItemList } from "./partials/dnd.common";
import { PageItem } from "./partials/PageItem";
export const ComponentTree = () => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    return useObserver(() => {
        return React.createElement(Card, { title: "Layout", bordered: false, style: { height: '100%' }, bodyStyle: { height: '100%', padding: '10px', overflow: 'auto', paddingBottom: '48px' } },
            React.createElement(Button, { type: "dashed", onClick: () => { store.setFormEditorVisible(true); }, shape: "circle", size: "small", icon: "edit", style: { marginRight: '5px', userSelect: 'none' } }),
            React.createElement(Badge, { status: "default", color: getBadgeStyle("Form"), text: `Form - ${store.formStore.form.name}` }),
            React.createElement(Droppable, { droppableId: "pages", type: "Page" }, (provided, snapshot) => {
                return React.createElement(ItemList, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                    store.formStore.form.content.pages.map((page, index) => {
                        return React.createElement("div", { key: page.uuid },
                            React.createElement(PageItem, { key: page.uuid, page: page, index: index }),
                            React.createElement(Divider, { style: { margin: '12px 0' } }));
                    }),
                    provided.placeholder);
            }));
    });
};
