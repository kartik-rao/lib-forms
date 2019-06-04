import { FormView } from '@kartikrao/lib-forms-core';
import 'airbnb-browser-shims';
import { Col, Layout, Row } from "antd";
import { observer } from 'mobx-react';
import * as React from "react";
import RootStore from "../models/RootStore";


export class IFormWrapperProps {
    store: RootStore;
}

@observer
export class FormWrapper extends React.Component <IFormWrapperProps, any> {

    props: IFormWrapperProps;

    constructor(props: IFormWrapperProps) {
        super(props);
    }

    render() {
        let {formStore} = this.props.store;
        let {wrapperOffset, wrapperSpan} = formStore.form.formLayoutOptions;
        return (
            <Layout style={{height:"100vh"}}>
                <Row><br/></Row>
                <Row justify={"space-around"}>
                    <Col span={wrapperSpan} offset={wrapperOffset}>
                        <FormView store={formStore} />
                    </Col>
                </Row>
            </Layout>
        );
    }
}