import * as React from "react";
import {Field} from "../models/model.field";

export class FieldComponent extends React.Component<Field, any> {
    constructor(props: Field) {
        super(props);
        this.state = {value: props.value}
    }
    render () {
        const props = this.props;
        const state = this.state;
        switch(this.props.type) {
            case "input":
                return (
                <div className="af-field">
                    <label htmlFor={props.id}>{props.label}</label>
                    <input id={props.id} value={state.value} type={props.inputType}></input>
                </div>
            )
            case "select":
                return (
                <div className="af-field">
                    <label htmlFor={props.id}>{props.label}</label>
                    <select id={props.id}>
                        { props.children.map((o, oi)=> {
                            return <option key={oi} id={props.id} value={o.value}>{o.label}</option>
                        })}
                    </select>
                </div>
            )
            case "textarea":
                return (
                <div className="af-field">
                    <label htmlFor={props.id}>{props.label}</label>
                    <textarea id={props.id}>
                        {state.value}
                    </textarea>
                </div>
            )
            case "radiogroup":
                return (
                    <div className="af-field">
                        { props.children.map((o, oi)=> {
                            return <span>
                                <label htmlFor={props.id}>{props.label}</label>
                                <input type='radio' name={o.name} key={oi}></input>
                            </span>
                        })}
                    </div>
                )
            default:
                return (<span>Unsupported element</span>)
        }
    }
}