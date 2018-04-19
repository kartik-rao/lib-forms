import * as React from "react";
import * as ReactDOM from "react-dom";
import './app.css';
import "antd/dist/antd.css"

import 'airbnb-browser-shims';
import {Row, Col, Layout} from "antd";
import {FormFactory} from "./factory/form.factory";
import FormComponent from "./components/component.form";

class FormWrapper extends React.Component <any, any> {
    props : any = {};
    state : any = {};

    constructor(props: any) {
        super(props);
        this.props = {form: FormFactory.createForm(props.form)};
    }

    render() {
        const { initialState, ...rest } = this.props
        const { form } = this.props;
        return (
            <Layout style={{height:"100vh"}}>
                <Row><br/></Row>
                <Row justify="space-around">
                    <Col span={16} offset={4}>
                        <FormComponent {...form}/>
                    </Col>
                </Row>
            </Layout>
        );
  }
}

export function render (props: any, target: string) {
    ReactDOM.render(new FormWrapper(props).render(), document.querySelector(target));
}
