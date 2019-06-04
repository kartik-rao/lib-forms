var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from "react";
import { Col } from "antd";
import EditableFieldComponent from "./EditableField";
import { DropTarget } from "react-dnd";
import { observer } from "mobx-react";
let EditableColumnComponent = class EditableColumnComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        let { store, column, span, eventHooks, sectionIndex, columnIndex, pageIndex } = this.props;
        const { fields } = column;
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;
        const style = {
            border: '1px dashed gray',
            minHeight: '150px'
        };
        const backgroundColor = isActive ? 'lightgreen' : '#FFF';
        return connectDropTarget((React.createElement("div", { className: "form-col" },
            React.createElement(Col, { span: span, style: Object.assign({}, style, { backgroundColor }) },
                React.createElement("span", null,
                    React.createElement("small", null,
                        "Col [",
                        column.id,
                        "] span [",
                        span,
                        "] ",
                        column.fields.length,
                        " field(s)")),
                fields.map((field, fn) => {
                    return React.createElement(EditableFieldComponent, { pageIndex: pageIndex, columnIndex: columnIndex, sectionIndex: sectionIndex, fieldIndex: fn, listId: column.id, field: field, key: fn, store: store, eventHooks: eventHooks, removeField: this.removeField.bind(this), moveField: this.moveField.bind(this) });
                })))));
    }
    pushField(field) {
        console.log("push");
        let { store, pageIndex, sectionIndex, columnIndex } = this.props;
        store.pushField(field, pageIndex, sectionIndex, columnIndex);
    }
    removeField(fieldIndex) {
        let { store, pageIndex, sectionIndex, columnIndex } = this.props;
        console.log("remove", pageIndex, sectionIndex, columnIndex, fieldIndex);
        store.removeField(fieldIndex, pageIndex, sectionIndex, columnIndex);
    }
    moveField(dragIndex, hoverIndex) {
        let { store, pageIndex, sectionIndex, columnIndex } = this.props;
        console.log("move", pageIndex, sectionIndex, columnIndex, dragIndex, hoverIndex);
        store.moveField(dragIndex, hoverIndex, pageIndex, sectionIndex, columnIndex);
    }
};
EditableColumnComponent = __decorate([
    observer
], EditableColumnComponent);
const fieldTarget = {
    drop(props, monitor, component) {
        const { listId } = props;
        const sourceObj = monitor.getItem();
        console.log("DROP props/sourceObj", props, sourceObj);
        if (listId !== sourceObj.listId)
            component.pushField(sourceObj.field);
        return {
            listId: listId
        };
    }
};
export default DropTarget("Field", fieldTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))(EditableColumnComponent);
