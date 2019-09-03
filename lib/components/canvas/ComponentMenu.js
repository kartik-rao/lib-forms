import { Card, Icon, Menu } from 'antd';
import { useLocalStore, useObserver } from 'mobx-react';
import * as React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from 'styled-components';
const Container = styled.div `
    padding: 4px;
    background-color: white;
`;
const Item = styled.div ``;
const getItemStyle = (isDragging, draggableStyle) => (Object.assign({ userSelect: 'none', background: isDragging ? '#ededed' : '#fff' }, draggableStyle));
export const ComponentMenu = () => {
    const localStore = useLocalStore(() => ({
        droppableIndex: 0,
        menuTheme: "light",
        menuMode: "vertical-left",
        submenuMode: "inline",
        submenuCollapsed: false,
        asDroppableGroup: function ({ dropId, dropType, key, title, icon, groups }) {
            return React.createElement(Droppable, { droppableId: dropId, type: dropType, isDropDisabled: true }, (provided, snapshot) => {
                return React.createElement(Item, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                    React.createElement(Menu, { inlineCollapsed: this.submenuCollapsed, mode: "inline", theme: this.menuTheme },
                        React.createElement(Menu.SubMenu, { key: key, title: React.createElement("span", null, title) }, groups.map((item, key) => {
                            return React.createElement(Menu.Item, { key: key, title: item.title },
                                React.createElement(Draggable, { type: item.dragType, draggableId: item.dragId, index: this.droppableIndex++ }, (provided, snapshot) => (React.createElement(Item, Object.assign({ ref: provided.innerRef }, provided.draggableProps, provided.dragHandleProps, { style: getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
                                    React.createElement("span", null,
                                        React.createElement(Icon, { type: item.icon }),
                                        " ",
                                        item.title),
                                    provided.placeholder))));
                        }))),
                    provided.placeholder);
            });
        },
        asDroppable: function (dropId, dropType, title, dragType, dragId, icon) {
            return React.createElement(Droppable, { droppableId: dropId, type: dropType, isDropDisabled: true }, (provided, snapshot) => (React.createElement(Item, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                React.createElement(Menu, { mode: this.menuMode, theme: this.menuTheme },
                    React.createElement(Menu.Item, { title: title },
                        React.createElement(Draggable, { type: dragType, draggableId: dragId, index: this.droppableIndex++ }, (provided, snapshot) => (React.createElement(Container, Object.assign({ ref: provided.innerRef }, provided.draggableProps, provided.dragHandleProps, { style: getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
                            React.createElement("span", null,
                                React.createElement(Icon, { type: icon }),
                                title),
                            provided.placeholder))))))));
        },
        asDraggableCard: function (dropId, dropType, title, dragType, dragId, icon) {
            return React.createElement(Droppable, { isCombineEnabled: false, droppableId: dropId, type: dropType, isDropDisabled: true, ignoreContainerClipping: false }, (provided, snapshot) => (React.createElement(React.Fragment, null,
                React.createElement(Item, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                    React.createElement(Draggable, { type: dragType, draggableId: dragId, index: this.droppableIndex++ }, (provided, snapshot) => (React.createElement(Card.Grid, { style: { border: 'none', width: '33%', textAlign: 'center', padding: '2px' } },
                        React.createElement(Container, Object.assign({ ref: provided.innerRef }, provided.draggableProps, provided.dragHandleProps, { style: getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
                            React.createElement("span", null,
                                React.createElement(Icon, { type: icon }),
                                React.createElement("br", null),
                                title)),
                        snapshot.isDragging && React.createElement(Container, null,
                            React.createElement("span", null,
                                React.createElement(Icon, { type: icon }),
                                React.createElement("br", null),
                                title)))))))));
        }
    }));
    return useObserver(() => {
        return React.createElement(Card, { bordered: false, title: "Palette", bodyStyle: { padding: '1px' } },
            React.createElement(Card, { size: "small", bodyStyle: { fontSize: '12px', padding: '0px', marginBottom: '1px' }, bordered: false, title: React.createElement("small", null, "Containers") },
                localStore.asDraggableCard("NewPage", "Page", "Page", "Page", "p1", "layout"),
                localStore.asDraggableCard("NewSection", "Section", "Section", "Section", "s1", "menu"),
                localStore.asDraggableCard("NewColumn", "Column", "Column", "Column", "c1", "column-width")),
            React.createElement(Card, { size: "small", bodyStyle: { fontSize: '12px', padding: '0px', marginBottom: '1px' }, bordered: false, title: React.createElement("small", null, "Basic") },
                localStore.asDraggableCard("NewTextField", "Field", "Text", "Field", "input", "font-size"),
                localStore.asDraggableCard("NewTextField", "Field", "Number", "Field", "number", "calculator"),
                localStore.asDraggableCard("NewTextField", "Field", "Check", "Field", "checkbox", "check-square"),
                localStore.asDraggableCard("NewTextField", "Field", "Radio", "Field", "radio", "check-circle"),
                localStore.asDraggableCard("NewTextField", "Field", "TextArea", "Field", "textarea", "profile"),
                localStore.asDraggableCard("NewTextField", "Field", "TextBlock", "Field", "textblock", "read"),
                localStore.asDraggableCard("NewTextField", "Field", "Checks", "Field", "checkboxgroup", "check-square"),
                localStore.asDraggableCard("NewTextField", "Field", "Radios", "Field", "radiogroup", "check-circle"),
                localStore.asDraggableCard("NewTextField", "Field", "Select", "Field", "select", "menu"),
                localStore.asDraggableCard("NewTextField", "Field", "Cascader", "Field", "cascader", "menu-unfold")),
            React.createElement(Card, { size: "small", bodyStyle: { fontSize: '12px', padding: '0px', marginBottom: '1px' }, bordered: false, title: React.createElement("small", null, "Date and Time") },
                localStore.asDraggableCard("NewTextField", "Field", "Date", "Field", "datepicker", "calendar"),
                localStore.asDraggableCard("NewTextField", "Field", "Range", "Field", "daterange", "calendar"),
                localStore.asDraggableCard("NewTextField", "Field", "Month", "Field", "monthpicker", "calendar"),
                localStore.asDraggableCard("NewTextField", "Field", "Time", "Field", "timepicker", "calendar"),
                localStore.asDraggableCard("NewTextField", "Field", "Year", "Field", "yearpicker", "calendar")),
            React.createElement(Card, { size: "small", bodyStyle: { fontSize: '12px', padding: '0px', marginBottom: '1px' }, bordered: false, title: React.createElement("small", null, "Interactive") },
                localStore.asDraggableCard("NewTextField", "Field", "HTML", "Field", "htmlfragment", "code"),
                localStore.asDraggableCard("NewTextField", "Field", "Slider", "Field", "slider", "control"),
                localStore.asDraggableCard("NewTextField", "Field", "Rating", "Field", "starrating", "star"),
                localStore.asDraggableCard("NewTextField", "Field", "Switch", "Field", "switch", "poweroff"),
                localStore.asDraggableCard("NewTextField", "Field", "Upload", "Field", "transfer", "file-zip")));
    });
};
