import { Logger } from "@kartikrao/lib-logging";
import 'airbnb-browser-shims';
import { Col, Layout, Row, Card } from "antd";
import DevTools from 'mobx-react-devtools';
import * as React from "react";
import RootStore from "../models/RootStore";
import ComponentTree from "./editable/ComponentTree";
import FormComponent from "./Form";

const debug = window.location.href.indexOf("localhost") > -1;

export class IEditableFormWrapperProps {
    store: RootStore;
}

export default class EditableFormWrapper extends React.Component <IEditableFormWrapperProps, any> {
    props: IEditableFormWrapperProps;

    constructor(props: IEditableFormWrapperProps) {
        super(props);
        this.props.store = props.store;
    }

    render() {
        const {store} = this.state;
        console.log("Store Instance", store);
        console.log("Form Props", store.formStore.form);

        return (
            <Layout style={{height:"100vh"}}>
                <Row>{debug && <DevTools/>}</Row>
                <Row justify="space-around">
                    <Col span={6} offset={1}>
                        <Card title="Outline"><ComponentTree store={store} formData={store.formData}></ComponentTree></Card>
                    </Col>
                    <Col span={15} offset={1}>
                    <FormComponent store={this.props.store}/>
                    </Col>
                </Row>
            </Layout>
        );
    }
}