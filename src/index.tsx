import * as React from "react";
import * as ReactDOM from "react-dom";
import './app.css';
import "antd/dist/antd.css"

import {Row, Col, Layout} from "antd";
import FormComponent from "./components/component.form";

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