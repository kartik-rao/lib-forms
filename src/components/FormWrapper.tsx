import 'airbnb-browser-shims';
import { Col, Layout, Row } from "antd";
import * as React from "react";
import { FormFactory } from "../factory/form.factory";
import FormComponent from "./Form";
import { IFormProps } from '@kartikrao/lib-forms-core';
import RootStore from "../models/RootStore";

export { FormFactory };
export { FormComponent };

export class IFormWrapperProps {
    formJSON: any;
    store?: RootStore;
}

export class IFormWrapperState {
    formProps: IFormProps
}

export class FormWrapper extends React.Component <IFormWrapperProps, IFormWrapperState> {
    props: IFormWrapperProps;
    constructor(props: IFormWrapperProps) {
        super(props);
        this.props.store = new RootStore(this.props.formJSON);
    }

    render() {
        let {formData} = this.props.store;
        return (
            <Layout style={{height:"100vh"}}>
                <Row><br/></Row>
                <Row justify={"space-around"}>
                    <Col span={formData.formLayoutOptions.wrapperSpan} offset={formData.formLayoutOptions.wrapperOffset}>
                        <FormComponent store={this.props.store}/>
                    </Col>
                </Row>
            </Layout>
        );
    }
}