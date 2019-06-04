var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from "react";
import { Form, Input, Select, Radio, DatePicker, InputNumber, Checkbox, Rate, Slider, Button } from "antd";
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from "react-dnd";
import flow from "lodash/flow";
import { observer } from "mobx-react";
let EditableFieldComponent = class EditableFieldComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        const style = {
            border: '1px dashed blue',
            padding: '0.25rem 0.5rem',
            margin: '.25rem',
            backgroundColor: 'white',
            cursor: 'move'
        };
        const { field, store, eventHooks, fieldIndex } = this.props;
        const { type } = field;
        const { isDragging, connectDragSource, connectDropTarget } = this.props;
        const opacity = isDragging ? 0 : 1;
        let { onChange, onBlur, selectField } = eventHooks();
        let { result } = store.conditionals[this.props.field.id];
        let { name } = field;
        let handleChange = (e) => { onChange(name, e.target ? e.target.value : e); };
        let handleBlur = () => onBlur(name);
        let location = `${field.location.page}-${field.location.section}-${field.location.column}-${field.location.field}`;
        return connectDragSource(connectDropTarget(React.createElement("div", { style: Object.assign({}, style, { opacity }), "data-location": location, "data-index": fieldIndex },
            React.createElement("span", null,
                React.createElement("small", null,
                    "Field type [",
                    type,
                    "] name [",
                    field.name,
                    "] condition [",
                    result.toString(),
                    "]"),
                React.createElement(Button, { icon: "edit", type: "primary", onClick: (e) => { e.preventDefault(); selectField(field); } })),
            result && React.createElement(Form.Item, { label: field.label, hasFeedback: store.touched[name] && !!store.errors[name], validateStatus: store.errors[name] && "error", help: store.errors[name] },
                (type == "input" || type == "hidden") && React.createElement(Input, { type: field.inputType, placeholder: field.placeholder, value: store.values[name], onChange: handleChange, onBlur: handleBlur }),
                type == "checkbox" && React.createElement(Checkbox, { onChange: handleChange, checked: store.values[name] == true }),
                type == "number" && React.createElement(InputNumber, { onChange: handleChange, onBlur: handleBlur, value: store.values[name] }),
                type == "select" && React.createElement(Select, { onChange: handleChange, onBlur: handleBlur, value: store.values[name] }, field.children.map((child, index) => {
                    return React.createElement(Select.Option, { key: "" + index, value: child.value }, child.label);
                })),
                type == "radiogroup" && React.createElement(Radio.Group, { onChange: handleChange, options: field.children, value: store.values[name] }),
                type == "checkboxgroup" && React.createElement(Checkbox.Group, { onChange: handleChange, options: field.children, value: store.values[name] }),
                type == "textarea" && React.createElement(Input.TextArea, { onChange: handleChange, value: store.values[name] }),
                type == "datepicker" && React.createElement(DatePicker, { onChange: handleChange, value: store.values[name] }),
                type == "monthpicker" && React.createElement(DatePicker.MonthPicker, { onChange: handleChange, value: store.values[name] }),
                type == "rangepicker" && React.createElement(DatePicker.RangePicker, { onChange: handleChange, value: store.values[name] }),
                type == "weekpicker" && React.createElement(DatePicker.WeekPicker, { onChange: handleChange, value: store.values[name] }),
                type == 'rate' && React.createElement(Rate, { onChange: handleChange, value: store.values[name] }),
                type == 'slider' && React.createElement(Slider, { onChange: handleChange, value: store.values[name] }),
                type == "textblock" && React.createElement("p", null, field.value)))));
    }
};
EditableFieldComponent = __decorate([
    observer
], EditableFieldComponent);
const fieldTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().fieldIndex;
        const hoverIndex = props.fieldIndex;
        const sourceListId = monitor.getItem().listId;
        console.log("HOVER HI, DI, SLI", !!props.moveField, dragIndex, hoverIndex, sourceListId);
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }
        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        // Time to actually perform the action
        if (props.listId === sourceListId) {
            props.moveField(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            monitor.getItem().fieldIndex = hoverIndex;
        }
    }
};
const fieldSource = {
    beginDrag(props) {
        console.log("begin drag", props);
        return {
            index: props.index,
            fieldIndex: props.fieldIndex,
            listId: props.listId,
            field: props.field
        };
    },
    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
        console.log("end drag", dropResult, item);
        if (dropResult && dropResult.listId !== item.listId) {
            console.log("end drag remove", item.fieldIndex);
            props.removeField(item.fieldIndex);
        }
    }
};
export default flow(DropTarget("Field", fieldTarget, connect => ({
    connectDropTarget: connect.dropTarget()
})), DragSource("Field", fieldSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
})))(EditableFieldComponent);
