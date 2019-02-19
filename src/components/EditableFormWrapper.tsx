import * as React from "react";

import 'airbnb-browser-shims';

import {Row, Col, Layout, Button} from "antd";
import {FormFactory} from "../factory/form.factory";
import EditableFormComponent from "./editable/EdtitableForm";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import {Logger} from "@adinfinity/ai-lib-logging";

const logger: Logger = Logger.getInstance(["ai-lib-forms", "EditableFormWrapper"], 5);
import {RootStore} from "./RootStore";
import { Provider } from "mobx-react";

class EditableFormWrapper extends React.Component <any, any> {
    props: any;
    constructor(props: any) {
        super(props);
        this.state = {store: new RootStore(props.formData)};
    }

    render() {
        const {formData} = this.state;
        return (
            <Layout style={{height:"100vh"}}>
                <Row><br/></Row>
                <Row justify="space-around">
                    <Col span={formData.formLayoutOptions.wrapperSpan} offset={formData.formLayoutOptions.wrapperOffset}>
                        <EditableFormComponent store={formData}/>
                    </Col>
                </Row>
            </Layout>
        );
    }
}

export default DragDropContext(HTML5Backend)(EditableFormWrapper)