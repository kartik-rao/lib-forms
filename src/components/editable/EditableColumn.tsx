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
    index: number;
}

@observer
class EditableColumnComponent extends React.Component<ColumnProps, any> {
    state: any;
    props: ColumnProps;

    constructor(props: ColumnProps) {
        super(props);
        this.props = props;
        this.state = {
            fields : props.column.fields,
            span: props.span
        }
    }

    pushField(card) {
		this.setState(update(this.state, {
			fields: {
				$push: [ card ]
			}
		}));
	}

	removeField(index) {
		this.setState(update(this.state, {
			fields: {
				$splice: [
					[index, 1]
				]
			}
		}));
	}

	moveField(dragIndex, hoverIndex) {
		const { fields } = this.state;
		const dragfield = fields[dragIndex];

		this.setState(update(this.state, {
			fields: {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, dragfield]
				]
			}
		}));
	}

    render() {
        let {store, column,  span, eventHooks} = this.props;
        const { fields } = column;
        const { canDrop, isOver, connectDropTarget } = this.props;

		const isActive = canDrop && isOver;
		const style = {
            border: '1px dashed gray',
            minHeight : '150px'
		};

		const backgroundColor = isActive ? 'lightgreen' : '#FFF';

        return connectDropTarget((
        <div>
            <Col span={span} style={{...style, backgroundColor}}>
            <span><small>Col [{column.id}] span [{span}] {column.fields.length} field(s)</small></span>
            {fields.map((field: IField, fn:number) => {
                return <EditableFieldComponent index={fn}
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
}

const fieldTarget = {
	drop(props, monitor, component ) {
		const { id } = props;
		const sourceObj = monitor.getItem();
		if ( id !== sourceObj.listId ) component.pushField(sourceObj.field);
		return {
			listId: id
		};
	}
}

export default DropTarget("Field", fieldTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
}))(EditableColumnComponent);