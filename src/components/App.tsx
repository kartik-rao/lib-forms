import * as React from "react";

import 'airbnb-browser-shims';

import {Row, Col, Layout, Button} from "antd";
import {FormFactory} from "../factory/form.factory";
import FormComponent from "./Form";

export {FormFactory};
export {FormComponent};

class App extends React.Component <any, any> {

    props: any;
    constructor(props: any) {
        super(props);
        this.state = {formData: FormFactory.createForm(this.props.formData)};
    }

    render() {
        const {formData} = this.state;
        return (
            <Layout style={{height:"100vh"}}>
                <Row><br/></Row>
                <Row justify="space-around">
                    <Col span={formData.formLayoutOptions.wrapperSpan} offset={formData.formLayoutOptions.wrapperOffset}>
                        <FormComponent formData={formData}/>
                    </Col>
                </Row>
                <Row>


                </Row>
            </Layout>
        );
    }
}

export default App;
