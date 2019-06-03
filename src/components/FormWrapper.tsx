import * as React from "react";
import 'airbnb-browser-shims';
import {Row, Col, Layout, Button, Card} from "antd";
import {FormFactory} from "../factory/form.factory";
import FormComponent from "./Form";
import ComponentTree from "./editable/ComponentTree";

export {FormFactory};
export {FormComponent};

export class IFormWrapperProps {
    formJSON: any;
}

export class FormWrapper extends React.Component <IFormWrapperProps, any> {
    props: IFormWrapperProps;
    constructor(props: IFormWrapperProps) {
        super(props);
        this.state = {formData: FormFactory.createForm(this.props.formJSON)};
    }

    render() {
        const {formData} = this.state;
        return (
            <Layout style={{height:"100vh"}}>
                <Row><br/></Row>
                <Row>
                </Row>
                <Row justify={"space-between"}>
                    <Col span={4} offset={1}>
                        <Card title="Outline"><ComponentTree formData={this.props.formJSON}></ComponentTree></Card>
                    </Col>
                    <Col span={16} offset={1}>

                        <FormComponent formData={formData}/>

                    </Col>
                </Row>
            </Layout>
        );
    }
}