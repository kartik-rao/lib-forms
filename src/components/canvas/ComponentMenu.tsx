import { Card, Icon, Menu } from 'antd';
import { useLocalStore, useObserver } from 'mobx-react';
import * as React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from 'styled-components';
import { MenuMode } from 'antd/lib/menu';
import { MenuTheme } from 'antd/lib/menu/MenuContext';

const Container = styled.div<any>`
    padding: 4px;
    background-color: white;
`;

const Item = styled.div<any>``;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    background: isDragging ? '#ededed' : '#fff',
    ...draggableStyle
});

export const ComponentMenu : React.FC<any> = () => {
    const localStore = useLocalStore(() => ({
        droppableIndex : 0,
        menuTheme: "light" as MenuTheme,
        menuMode: "vertical-left" as MenuMode,
        submenuMode: "inline",
        submenuCollapsed: false,
        asDroppableGroup : function({ dropId, dropType, key, title, icon, groups }) {
            return <Droppable droppableId={dropId} type={dropType} isDropDisabled={true}>
                    {(provided, snapshot) => {
                    return <Item isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
                        <Menu inlineCollapsed={this.submenuCollapsed} mode={"inline"} theme={this.menuTheme}>
                            <Menu.SubMenu key={key} title={<span>{title}</span>}>
                                    {groups.map((item, key: number) => {
                                        return <Menu.Item key={key} title={item.title}>
                                            <Draggable type={item.dragType} draggableId={item.dragId} index={this.droppableIndex++}>
                                                {(provided, snapshot) => (
                                                    <Item ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                                        <span><Icon type={item.icon} /> {item.title}</span>
                                                        {provided.placeholder}
                                                    </Item>
                                                )}
                                            </Draggable>
                                        </Menu.Item>
                                    })}
                            </Menu.SubMenu>
                        </Menu>
                        {provided.placeholder}
                    </Item>
                }}
            </Droppable>
        },
        asDroppable : function (dropId, dropType, title, dragType, dragId, icon) {
            return <Droppable droppableId={dropId} type={dropType} isDropDisabled={true}>
                {(provided, snapshot) => (
                    <Item isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
                        <Menu mode={this.menuMode} theme={this.menuTheme}>
                            <Menu.Item title={title}>
                                <Draggable type={dragType} draggableId={dragId} index={this.droppableIndex++}>
                                {(provided, snapshot) => (
                                    <Container ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                            <span><Icon type={icon} />{title}</span>
                                        {provided.placeholder}
                                    </Container>
                                )}
                                </Draggable>
                            </Menu.Item>
                        </Menu>
                    </Item>
                )}
            </Droppable>
        },
        asDraggableCard : function (dropId, dropType, title, dragType, dragId, icon) {
            return <Droppable isCombineEnabled={false} droppableId={dropId} type={dropType} isDropDisabled={true} ignoreContainerClipping={false}>
                {(provided, snapshot) => (
                    <>
                    <Item isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
                        <Draggable type={dragType} draggableId={dragId} index={this.droppableIndex++}>
                            {(provided, snapshot) => (
                                <Card.Grid style={{ border:'none', width: '33%', textAlign: 'center', padding: '2px' }}>
                                    <Container ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                    <span><Icon type={icon}></Icon><br/>{title}</span>
                                </Container>
                                {snapshot.isDragging && <Container><span><Icon type={icon}></Icon><br/>{title}</span></Container>}
                            </Card.Grid>
                        )}
                        </Draggable>
                    </Item>
                    </>
                )}
            </Droppable>
        }
    }));
    return useObserver(() => {
        return <Card bordered={false}  title={"Palette"} bodyStyle={{padding: '1px'}}>
        <Card size="small" bodyStyle={{ fontSize: '12px', padding: '0px', marginBottom: '1px' }} bordered={false} title={<small>Containers</small>}>
            {localStore.asDraggableCard("NewPage", "Page", "Page", "Page", "p1", "layout")}
            {localStore.asDraggableCard("NewSection", "Section", "Section", "Section", "s1", "menu")}
            {localStore.asDraggableCard("NewColumn", "Column", "Column", "Column", "c1", "column-width")}
        </Card>
        <Card size="small" bodyStyle={{ fontSize: '12px', padding: '0px', marginBottom: '1px' }}  bordered={false} title={<small>Basic</small>}>
            {localStore.asDraggableCard("NewTextField", "Field", "Text", "Field", "input", "font-size")}
            {localStore.asDraggableCard("NewTextField", "Field", "Number", "Field", "number", "calculator")}
            {localStore.asDraggableCard("NewTextField", "Field", "Check", "Field", "checkbox", "check-square")}
            {localStore.asDraggableCard("NewTextField", "Field", "Radio", "Field", "radio", "check-circle")}
            {localStore.asDraggableCard("NewTextField", "Field", "TextArea", "Field", "textarea", "profile")}
            {localStore.asDraggableCard("NewTextField", "Field", "TextBlock", "Field", "textblock", "read")}
            {localStore.asDraggableCard("NewTextField", "Field", "Checks", "Field", "checkboxgroup", "check-square")}
            {localStore.asDraggableCard("NewTextField", "Field", "Radios", "Field", "radiogroup", "check-circle")}
            {localStore.asDraggableCard("NewTextField", "Field", "Select", "Field", "select", "menu")}
            {localStore.asDraggableCard("NewTextField", "Field", "Cascader", "Field", "cascader", "menu-unfold")}
        </Card>
        <Card size="small" bodyStyle={{ fontSize: '12px',padding: '0px', marginBottom: '1px' }}  bordered={false} title={<small>Date and Time</small>}>
            {localStore.asDraggableCard("NewTextField", "Field", "Date", "Field", "datepicker", "calendar")}
            {localStore.asDraggableCard("NewTextField", "Field", "Range", "Field", "daterange", "calendar")}
            {localStore.asDraggableCard("NewTextField", "Field", "Month", "Field", "monthpicker", "calendar")}
            {localStore.asDraggableCard("NewTextField", "Field", "Time", "Field", "timepicker", "calendar")}
            {localStore.asDraggableCard("NewTextField", "Field", "Year", "Field", "yearpicker", "calendar")}
        </Card>
        <Card size="small" bodyStyle={{ fontSize: '12px',padding: '0px', marginBottom: '1px' }}  bordered={false} title={<small>Interactive</small>}>
            {localStore.asDraggableCard("NewTextField", "Field", "HTML", "Field", "htmlfragment", "code")}
            {localStore.asDraggableCard("NewTextField", "Field", "Slider", "Field", "slider", "control")}
            {localStore.asDraggableCard("NewTextField", "Field", "Rating", "Field", "starrating", "star")}
            {localStore.asDraggableCard("NewTextField", "Field", "Switch", "Field", "switch", "poweroff")}
            {localStore.asDraggableCard("NewTextField", "Field", "Upload", "Field", "transfer", "file-zip")}
        </Card>
    </Card>
    });
}
