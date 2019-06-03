import * as React from "react";

import 'airbnb-browser-shims';

import {Row, Col, Layout, Button} from "antd";
import {FormFactory} from "../factory/form.factory";
import EditableFormComponent from "./editable/EdtitableForm";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import {Logger} from "@adinfinity/ai-lib-logging";

const logger: Logger = Logger.getInstance(["ai-lib-forms", "EditableFormWrapper"], 5);
import RootStore from "../models/RootStore";
import DevTools from 'mobx-react-devtools';

import ComponentTree from "./editable/ComponentTree";
import { FormComponent } from "./Form";

const debug = window.location.href.indexOf("localhost") > -1;

export class IEditableFormWrapperProps {
    formJSON: any;
}

export default class EditableFormWrapper extends React.Component <IEditableFormWrapperProps, any> {
    props: IEditableFormWrapperProps;
    constructor(props: IEditableFormWrapperProps) {
        super(props);
        this.state = {store: new RootStore(props.formJSON)};
    }

    render() {
        console.log("Store Instance", this.state.store.formData.content)
        const {store} = this.state;
        return (
            <Layout style={{height:"100vh"}}>
                <Row>{debug && <DevTools/>}</Row>
                <Row justify="space-around">
                    <Col span={store.formData.formLayoutOptions.wrapperSpan} offset={store.formData.formLayoutOptions.wrapperOffset}>
                        <FormComponent formData={this.props.formJSON}/>
                    </Col>
                </Row>
            </Layout>
        );
    }
}