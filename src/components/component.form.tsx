import * as React from "react";
import * as ReactDOM from "react-dom";

import {Form} from "../models/model.form";
import {Page} from "../models/model.page";
import {PageComponent} from "./component.page";

export class FormComponent extends React.Component<Form, any> {
    constructor(props: Form) {
        super(props);
        this.state = Object.assign({}, props.values || {});
    }

    render() {
        return (
            <form className="af-form">
                {this.props.content.pages.map((p: Page, i)=>{
                    return <PageComponent key={i} {...p}/>
                })}
            </form>
        )
    }
}