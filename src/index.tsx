import * as React from "react";
import * as ReactDOM from "react-dom";
import {FormComponent} from "./components/component.form";

export class FormFactory extends React.Component <any, any> {
    props : any = {};
    state : any = {};

    handleChange(event) {
        const field = event.target.getAttribute('data-field');
        if (field) {
            this.state.value[field] = event.target.value;
        }
        console.log(this.state.value);
      }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    constructor(props: any) {
        super(props);
        this.props = props;
        this.state = {value: props.form.initialState || {}};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const { initialState, ...rest } = this.props
        const { form } = this.props;
        console.log(this);
        return (
            <FormComponent id="foo" content={
                {
                    pages: [
                        {
                            sections: [
                                {
                                    fields: [
                                        {id:"f1", name:"f1", type: "input", inputType: "text"}
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }/>
        );
  }
}