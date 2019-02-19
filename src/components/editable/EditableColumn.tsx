import * as React from "react";
import {Col} from "antd";

import {IField, IColumn} from "@adinfinity/ai-core-forms";
import EditableFieldComponent from "./EditableField";

import {DropTarget} from "react-dnd";
import update from 'immutability-helper';
import RootStore from "../../models/RootStore";
import { observer } from "mobx-react";

export interface ColumnProps {
    column: IColumn;
    span: number;
    eventHooks:any;
    canDrop: any;
    isOver: any;
    connectDropTarget: any;
    store: RootStore;
    pageIndex: number;
    sectionIndex: number;
    columnIndex: number;
}

@observer
class EditableColumnComponent extends React.Component<ColumnProps, any> {
    props: ColumnProps;

    constructor(props: ColumnProps) {
        super(props);
        this.props = props;
    }

    render() {
        let {store, column, span, eventHooks, sectionIndex, columnIndex, pageIndex} = this.props;
        const { fields } = column;
        const { canDrop, isOver, connectDropTarget } = this.props;

		const isActive = canDrop && isOver;
		const style = {
            border: '1px dashed gray',
            minHeight : '150px'
		};

		const backgroundColor = isActive ? 'lightgreen' : '#FFF';

        return connectDropTarget((
        <div className="form-col">
            <Col span={span} style={{...style, backgroundColor}}>
            <span><small>Col [{column.id}] span [{span}] {column.fields.length} field(s)</small></span>
            {fields.map((field: IField, fn:number) => {
                return <EditableFieldComponent
                    pageIndex={pageIndex}
                    columnIndex={columnIndex}
                    sectionIndex={sectionIndex}
                    fieldIndex={fn}
                    listId={column.id}
                    field={field}
                    key={fn}
                    store={store}
                    eventHooks={eventHooks}
                    removeField={this.removeField.bind(this)}
                    moveField={this.moveField.bind(this)}/>
            })}
            </Col>
        </div>));
    }

    pushField(field: IField) {
        console.log("push");
        let {store, pageIndex, sectionIndex, columnIndex} = this.props
        store.pushField(field, pageIndex, sectionIndex, columnIndex);
	}

	removeField(fieldIndex: number) {
        let {store, pageIndex, sectionIndex, columnIndex} = this.props
        console.log("remove", pageIndex, sectionIndex, columnIndex, fieldIndex);
        store.removeField(fieldIndex, pageIndex, sectionIndex, columnIndex);
	}

	moveField(dragIndex, hoverIndex) {
        let {store, pageIndex, sectionIndex, columnIndex} = this.props;
        console.log("move", pageIndex, sectionIndex, columnIndex, dragIndex, hoverIndex);
        store.moveField(dragIndex, hoverIndex, pageIndex, sectionIndex, columnIndex);
	}
}

const fieldTarget = {
	drop(props, monitor, component ) {
		const { listId } = props;
        const sourceObj = monitor.getItem();
        console.log("DROP props/sourceObj", props,sourceObj);
		if ( listId !== sourceObj.listId ) component.pushField(sourceObj.field);
		return {
			listId: listId
		};
	}
}

export default DropTarget("Field", fieldTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
}))(EditableColumnComponent);