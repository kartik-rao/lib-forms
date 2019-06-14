import { Col, Drawer, Row, Tabs } from "antd";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { IEditorView } from "../common/IComponentEditorView";
import FormContentEditorView from "./partials/FormContentSettingsView";
import FormLayoutView from "./partials/FormLayoutView";
import FormPropertiesEditorView from "./partials/FormPropertiesEditorView";

@observer
export class FormEditorView extends React.Component<IEditorView, any> {
    render() {
        let {editorStore} = this.props.store;
        let form = editorStore.formEditorVisible ? toJS(editorStore.formStore.form) : null;
        return form && <Drawer title={`Form "${form.name}" `}
            onClose={() => editorStore.setFormEditorVisible(false)} visible={editorStore.formEditorVisible == true}
            width={700}
            style={{ overflow: 'hidden'}}>
            {   <Tabs size="small">
                    <Tabs.TabPane tab="Settings" key="1">
                        <Row><Col span={24}><FormPropertiesEditorView store={this.props.store}/></Col></Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Content" key="2">
                        <Row><Col span={24}><FormContentEditorView store={this.props.store}/></Col></Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Layout" key="3">
                        <Row>
                            <Col span={24}>
                                <FormLayoutView store={this.props.store}/>
                            </Col>
                        </Row>
                    </Tabs.TabPane>
                </Tabs>
            }
        </Drawer>
    }
}
