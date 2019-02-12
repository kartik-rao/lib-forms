import * as React from "react";
import {Col} from "antd";

import {IField, IColumn, FormLayoutOptions} from "@adinfinity/ai-core-forms";
import EditableFieldComponent from "./EditableField";

import {DropTarget} from "react-dnd";
import update from 'immutability-helper';

export interface ColumnProps {
    column: IColumn;
    formLayout: FormLayoutOptions;
    span: number;
    decorators: any;
    eventHooks:any;
    conditionals:any;
    canDrop: any;
    isOver: any;
    connectDropTarget: any;
}

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
        let {formLayout, conditionals, decorators, eventHooks} = this.props;
        const { fields } = this.state;
        const { canDrop, isOver, connectDropTarget } = this.props;

		const isActive = canDrop && isOver;
		const style = {
            border: '1px dashed gray',
            minHeight : '150px'
		};

		const backgroundColor = isActive ? 'lightgreen' : '#FFF';

        return connectDropTarget((
        <div>
            <Col span={this.state.span} style={{...style, backgroundColor}}>
            <span><small>Col [{this.props.column.id}] span [{this.state.span}] {this.state.fields.length} field(s)</small></span>
            {fields.map((field: IField, fn:number) => {
                return <EditableFieldComponent index={fn}
                    listId={this.props.column.id}
                    field={field}
                    key={fn}
                    formLayout={formLayout}
                    conditionals={conditionals}
                    decorators={decorators}
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