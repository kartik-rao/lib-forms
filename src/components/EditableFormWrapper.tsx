import { Logger } from "@adinfinity/ai-lib-logging";
import 'airbnb-browser-shims';
import { Col, Layout, Row, Card } from "antd";
import DevTools from 'mobx-react-devtools';
import * as React from "react";
import RootStore from "../models/RootStore";
import ComponentTree from "./editable/ComponentTree";
import FormComponent from "./Form";
import { FormFactory } from "./FormWrapper";
import { IFormProps } from "@adinfinity/ai-core-forms";

const logger: Logger = Logger.getInstance(["ai-lib-forms", "EditableFormWrapper"], 5);
const debug = window.location.href.indexOf("localhost") > -1;

export class IEditableFormWrapperProps {
    formJSON: any;
}

export class IEditableFormWrapperState {
    store: RootStore;
    formProps: IFormProps;
}

export default class EditableFormWrapper extends React.Component <IEditableFormWrapperProps, IEditableFormWrapperState> {
    props: IEditableFormWrapperProps;
    constructor(props: IEditableFormWrapperProps) {
        super(props);
        this.state = {
            store: new RootStore(props.formJSON),
            formProps: FormFactory.createForm(this.props.formJSON)
        };
    }

    render() {
        const {formProps, store} = this.state;
        console.log("Store Instance", store);
        console.log("Form Props", formProps);

        return (
            <Layout style={{height:"100vh"}}>
                <Row>{debug && <DevTools/>}</Row>
                <Row justify="space-around">
                    <Col span={6} offset={1}>
                        <Card title="Outline"><ComponentTree store={store} formData={formProps}></ComponentTree></Card>
                    </Col>
                    <Col span={15} offset={1}>
                        <FormComponent formData={formProps}/>
                    </Col>
                </Row>
            </Layout>
        );
    }
}