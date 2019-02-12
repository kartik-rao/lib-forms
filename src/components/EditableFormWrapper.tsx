import * as React from "react";

import 'airbnb-browser-shims';

import {Row, Col, Layout, Button} from "antd";
import {FormFactory} from "../factory/form.factory";
import EditableFormComponent from "./editable/EdtitableForm";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

class EditableFormWrapper extends React.Component <any, any> {
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
                        <EditableFormComponent formData={formData}/>
                    </Col>
                </Row>
            </Layout>
        );
    }
}

export default DragDropContext(HTML5Backend)(EditableFormWrapper)