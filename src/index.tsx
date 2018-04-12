import * as React from "react";
import * as ReactDOM from "react-dom";

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
            <form {...form.props}>
                {
                    (form.children||[]).map((f, i) => {
                        const props = f.props;
                        const id = f.props.id || `field-${i}`
                        const label = f.label||{};
                        const field = f.props['data-field'];

                        switch(f.element) {
                            case "input":
                                return (
                                <div className="field-wrapper" key={i}>
                                    <label htmlFor={id} {...label.props}>{label.text}</label>
                                    <input id={id} {...f.props} onChange={this.handleChange}></input>
                                </div>
                            )
                            case "select":
                                return (
                                <div className="field-wrapper" key={i}>
                                    <label htmlFor={id} {...label.props}>{label.text}</label>
                                    <select  id={id} {...f.props} onChange={this.handleChange}>
                                        { f.children.map((o, oi)=> {
                                            return <option key={oi} {...o.props}>{o.text||''}</option>
                                        })}
                                    </select>
                                </div>
                            )
                            case "textarea":
                                return (
                                <div className="field-wrapper" key={i}>
                                    <label htmlFor={id} {...label.props}>{label.text}</label>
                                    <textarea id={id} {...f.props} onChange={this.handleChange}>
                                        {f.value||''}
                                    </textarea>
                                </div>
                            )
                            case "radiogroup":
                                return (
                                    <div className="field-wrapper" key={i}>
                                        { f.children.map((o, oi)=> {
                                            return
                                            <label htmlFor={`id-${oi}`}>
                                                <input id={`id-${oi}`} type='radio' name={field} key={oi} {...o.props}></input>
                                            </label>
                                        })}
                                    </div>
                                )
                        }
                    })
                }
            </form>
        );
  }
}