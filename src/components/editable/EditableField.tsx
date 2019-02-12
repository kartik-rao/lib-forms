import * as React from "react";
import {IField, FormLayoutOptions} from "@adinfinity/ai-core-forms";
import {Form, Input, Select, Radio, DatePicker, InputNumber, Checkbox, Rate, Slider} from "antd";
import { findDOMNode } from 'react-dom';
import {DragSource, DropTarget} from "react-dnd";
import flow from "lodash/flow";

export interface FieldProps {
    field: IField;
    formLayout: FormLayoutOptions;
    decorators: any;
    eventHooks:any;
    conditionals:any;
    index: number;
    listId: any;
    removeField: any;
    moveField: any;
    isDragging: any;
    connectDragSource: any;
    connectDropTarget: any;
}

class EditableFieldComponent extends React.Component<FieldProps, any> {

    constructor(props: FieldProps) {
        super(props);
        this.props = props;
        this.state = {
            hidden :!props.conditionals[this.props.field.id].result
        }
    }

    componentWillUnmount() {console.log("Unmount", this.props.field.name);}
    componentWillMount() {console.log("Mount", this.props.field.name);}

    render() {
        const style = {
            border: '1px dashed blue',
            padding: '0.25rem 0.5rem',
            margin: '.25rem',
            backgroundColor: 'white',
            cursor: 'move'
        };
        const { field, decorators, formLayout, eventHooks} = this.props;
        const {type} = field;
        const { isDragging, connectDragSource, connectDropTarget } = this.props;
		const opacity = isDragging ? 0 : 1;

        let decorator : any = decorators.getFieldDecorator;
        let {onChange} = eventHooks(field.id)
        let {result} = this.props.conditionals[this.props.field.id];

        return connectDragSource(connectDropTarget(
            <div style={{ ...style, opacity }}>
            {<span><small>Field type [{type}] name [{field.name}] condition [{result.toString()}]</small></span>}
            {result && <Form.Item label={field.label} {...formLayout}>
            {(type == "input" || type == "hidden") && decorator(field.id, field.fieldOptions)(
                <Input onChange={onChange} type={field.inputType} placeholder={field.placeholder} />)
            }
            {type == "checkbox" && decorator(field.id, field.fieldOptions)(
                <Checkbox onChange={onChange}/>)
            }
            {type == "number" && decorator(field.id, field.fieldOptions)(
                <InputNumber onChange={onChange} />
            )}
            {type == "select" && decorator(field.id, field.fieldOptions)(
                <Select onChange={onChange}>
                    {field.children.map((child: any, index: number) => {
                        return <Select.Option key={""+index} value={child.value}>{child.label}</Select.Option>
                    })}
                </Select>
            )}
            {type == "radiogroup" && decorator(field.id, field.fieldOptions)(
                <Radio.Group onChange={onChange} options={field.children}>
                    {/* {field.children.map((child: any, index: number)  => {
                        return <Radio key={""+index} value={child.value}>{child.label}</Radio>
                    })} */}
                </Radio.Group>
            )}
            {type == "checkboxgroup" && decorator(field.id, field.fieldOptions)(
                <Checkbox.Group onChange={onChange} options={field.children} />
            )}
            {type == "textarea" && decorator(field.id, field.fieldOptions)(
                <Input.TextArea onChange={onChange}></Input.TextArea>
            )}
            {type == "datepicker" && decorator(field.id, field.fieldOptions)(
                <DatePicker onChange={onChange}/>
            )}
            {type == "monthpicker" && decorator(field.id, field.fieldOptions)(
                <DatePicker.MonthPicker onChange={onChange}/>
            )}
            {type == "rangepicker" && decorator(field.id, field.fieldOptions)(
               <DatePicker.RangePicker onChange={onChange}/>
            )}
            {type == "weekpicker" && decorator(field.id, field.fieldOptions)(
                <DatePicker.WeekPicker onChange={onChange}/>
            )}
            {type == 'rate' && decorator(field.id, field.fieldOptions)(
                <Rate onChange={onChange}></Rate>
            )}
            {type == 'slider' && decorator(field.id, field.fieldOptions)(
                <Slider onChange={onChange}></Slider>
            )}
            {type == "textblock" && <p>{field.value}</p>}
            </Form.Item>}
        </div>))
    }
}

const fieldTarget = {
	hover(props, monitor, component) {
        console.log("fieldTarget.hover");
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;
		const sourceListId = monitor.getItem().listId;

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
		if ( props.listId === sourceListId ) {
			props.moveField(dragIndex, hoverIndex);

			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			monitor.getItem().index = hoverIndex;
		}
    }
}

const fieldSource = {
	beginDrag(props) {
        console.log("begin drag")
		return {
			index: props.index,
			listId: props.listId,
			field: props.field
		};
	},

	endDrag(props, monitor) {
        console.log("end drag")
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();

		if ( dropResult && dropResult.listId !== item.listId ) {
			props.removeField(item.index);
		}
	}
}

export default flow(
	DropTarget("Field", fieldTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	DragSource("Field", fieldSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
)(EditableFieldComponent);