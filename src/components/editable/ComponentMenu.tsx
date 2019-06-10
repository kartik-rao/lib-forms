import { Icon, Menu, Divider, Card } from 'antd';
import * as React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from 'styled-components';

const Container = styled.div`
    padding: 4px;
    background-color: white;
`;

const Item = styled.div`

`;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    // fontSize: '12px',
    // change background colour if dragging
    background: isDragging ? '#ededed' : '#fff',
    // styles we need to apply on draggables
    ...draggableStyle
});

const basicGroup = {
    dropId: 'NewTextItem',
    dropType: 'Field',
    key: 'Text',
    title: 'Basic',
    icon: '',
    groups: [
        { key: 'text', title: 'Text', dragType: 'Field', dragId: 'input', icon: 'font-size' },
        { key: 'number', title: 'Number', dragType: 'Field', dragId: 'number', icon: 'calculator' },
        { key: 'select', title: 'Select', dragType: 'Field', dragId: 'select', icon: 'menu-unfold' },
        { key: 'checkbox', title: 'Checkbox', dragType: 'Field', dragId: 'checkbox', icon: 'check-square' },
        { key: 'radio', title: 'Radio', dragType: 'Field', dragId: 'radio', icon: 'check-circle' },
        { key: 'textarea', title: 'Text Area', dragType: 'Field', dragId: 'textarea', icon: 'profile' },
        { key: 'textblock', title: 'Text Block', dragType: 'Field', dragId: 'textblock', icon: 'read' }
    ]
};

const dateTimeGroup = {
    dropId: 'NewCalendarItem',
    dropType: 'Field',
    key: 'Calendar',
    title: 'Date and Time',
    icon: '',
    groups: [
        { key: 'datepicker', title: 'Date', dragType: 'Field', dragId: 'datepicker', icon: 'calendar' },
        { key: 'daterange', title: 'Range', dragType: 'Field', dragId: 'daterange', icon: 'calendar' },
        { key: 'monthpicker', title: 'Month', dragType: 'Field', dragId: 'monthpicker', icon: 'calendar' },
        { key: 'timepicker', title: 'Time', dragType: 'Field', dragId: 'timepicker', icon: 'calendar' },
        { key: 'yearpicker', title: 'Year', dragType: 'Field', dragId: 'yearpicker', icon: 'calendar' },
    ]
};

const choiceGroup = {
    dropId: 'NewChoiceGroupItem',
    dropType: 'Field',
    key: 'Choice',
    title: 'Grouped Choice',
    icon: '',
    groups: [
        { key: 'checkboxgroup', title: 'Checkbox Group', dragType: 'Field', dragId: 'checkboxgroup', icon: 'check-square' },
        { key: 'radiogroup', title: 'Radio Group', dragType: 'Field', dragId: 'radiogroup', icon: 'check-circle' },
        { key: 'cascader', title: 'Cascaded Select', dragType: 'Field', dragId: 'cascader', icon: 'menu-unfold' }
    ]
}

const interactiveGroup = {
    dropId: 'NewInteractiveItem',
    dropType: 'Field',
    key: 'Interactive',
    title: 'Interactive',
    icon: '',
    groups: [
        { key: 'slider', title: 'Slider', dragType: 'Field', dragId: 'slider', icon: 'control' },
        { key: 'starrating', title: 'Star Rating', dragType: 'Field', dragId: 'starrating', icon: 'star' },
        { key: 'switch', title: 'Switch', dragType: 'Field', dragId: 'switch', icon: 'poweroff' },
        { key: 'transfer', title: 'Upload', dragType: 'Field', dragId: 'transfer', icon: 'file-zip' }
    ]
}

export class ComponentMenu extends React.Component<any, any> {
    droppableIndex = 0;
    menuTheme: "light";
    menuMode: "vertical-left";
    submenuMode: "inline";
    submenuCollapsed: false;

    asDroppableGroup = ({ dropId, dropType, key, title, icon, groups }) => {
        return <Droppable droppableId={dropId} type={dropType} isDropDisabled={true}>
                {(provided, snapshot) => {
                return <Item isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
                    <Menu inlineCollapsed={this.submenuCollapsed} mode="inline" theme={this.menuTheme}>
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
                </Item>
            }}
        </Droppable>
    }

    asDroppable = (dropId, dropType, title, dragType, dragId, icon) => {
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
    }

    asDraggableCard = (dropId, dropType, title, dragType, dragId, icon) => {
        return <Droppable droppableId={dropId} type={dropType} isDropDisabled={true}>
            {(provided, snapshot) => (
                <Item isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
                    <Draggable type={dragType} draggableId={dragId} index={this.droppableIndex++}>
                        {(provided, snapshot) => (
                            <Card.Grid style={{ border:'none', width: '33%', textAlign: 'center', padding: '2px' }}>
                                <Container ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                <span><Icon type={icon}></Icon><br/>{title}</span>
                            {provided.placeholder}
                            </Container>
                        </Card.Grid>
                    )}
                    </Draggable>
                </Item>
            )}
        </Droppable>
    }


    render() {
        return <Card bordered={false} size={"small"} title="Controls" bodyStyle={{padding: '0px'}}>
            <Card size="small" bodyStyle={{ fontSize: '12px', padding: '0px', marginBottom: '1px' }} bordered={false} title="Containers">
                {this.asDraggableCard("NewPage", "Page", "Page", "Page", "p1", "layout")}
                {this.asDraggableCard("NewSection", "Section", "Section", "Section", "s1", "menu")}
                {this.asDraggableCard("NewColumn", "Column", "Column", "Column", "c1", "column-width")}
            </Card>
            <Card size="small" bodyStyle={{ fontSize: '12px', padding: '0px', marginBottom: '1px' }}  bordered={false} title="Basic">
                {this.asDraggableCard("NewTextField", "Field", "Text", "Field", "input", "font-size")}
                {this.asDraggableCard("NewTextField", "Field", "Number", "Field", "number", "calculator")}
                {this.asDraggableCard("NewTextField", "Field", "Check", "Field", "checkbox", "check-square")}
                {this.asDraggableCard("NewTextField", "Field", "Radio", "Field", "radio", "check-circle")}
                {this.asDraggableCard("NewTextField", "Field", "TextArea", "Field", "textarea", "profile")}
                {this.asDraggableCard("NewTextField", "Field", "TextBlock", "Field", "textblock", "read")}
                {this.asDraggableCard("NewTextField", "Field", "Checks", "Field", "checkboxgroup", "check-square")}
                {this.asDraggableCard("NewTextField", "Field", "Radios", "Field", "radiogroup", "check-circle")}
                {this.asDraggableCard("NewTextField", "Field", "Select", "Field", "select", "menu")}
                {this.asDraggableCard("NewTextField", "Field", "Cascader", "Field", "cascader", "menu-unfold")}
            </Card>
            <Card size="small" bodyStyle={{ fontSize: '12px',padding: '0px', marginBottom: '1px' }}  bordered={false} title="Date and Time">
                {this.asDraggableCard("NewTextField", "Field", "Date", "Field", "datepicker", "calendar")}
                {this.asDraggableCard("NewTextField", "Field", "Range", "Field", "daterange", "calendar")}
                {this.asDraggableCard("NewTextField", "Field", "Month", "Field", "monthpicker", "calendar")}
                {this.asDraggableCard("NewTextField", "Field", "Time", "Field", "timepicker", "calendar")}
                {this.asDraggableCard("NewTextField", "Field", "Year", "Field", "yearpicker", "calendar")}
            </Card>
            <Card size="small" bodyStyle={{ fontSize: '12px',padding: '0px', marginBottom: '1px' }}  bordered={false} title="Interactive">
                {this.asDraggableCard("NewTextField", "Field", "Slider", "Field", "slider", "control")}
                {this.asDraggableCard("NewTextField", "Field", "Rating", "Field", "starrating", "star")}
                {this.asDraggableCard("NewTextField", "Field", "Switch", "Field", "switch", "poweroff")}
                {this.asDraggableCard("NewTextField", "Field", "Upload", "Field", "transfer", "file-zip")}
            </Card>
        </Card>
    }
}