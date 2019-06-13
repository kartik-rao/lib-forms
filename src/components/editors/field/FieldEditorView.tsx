import { Tabs, Drawer, Row, Col, Modal } from "antd";
import { observer } from "mobx-react";
import {action} from "mobx";
import * as React from "react";
import { ConditionsView } from "./partials/ConditionsView";
import FieldPropertiesView from "./partials/PropertiesView";
import { ValidationView } from "./partials/ValidationView";
import {IEditorView} from "../common/IComponentEditorView";

@observer
export class FieldEditorView extends React.Component<IEditorView,any> {
    constructor(props:any) {
        super(props);
    }

    @action onOk() {
        this.props.store.editorStore.setEditable(null);
    }

    @action onCancel() {

    }

    render() {
        let {editorStore} = this.props.store;
        let {field} = editorStore;

        return field && <Drawer title={`Field ${field.name} (id=${field.id||''} class=${field.className})`}
            width={700} onClose={() => editorStore.setEditable(null)} visible={editorStore.showFieldEditor}
            style={{ overflow: 'auto', height: 'calc(80% - 108px)', paddingBottom: '108px' }}>
            {
                <Tabs size="small">
                    <Tabs.TabPane tab="Properties" key="1">
                        <Row><Col span={24}><FieldPropertiesView store={this.props.store}/></Col></Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Validation" key="2">
                        <Row><Col span={24}><ValidationView store={this.props.store}/></Col></Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Condition" key="3">
                        <Row><Col span={24}><ConditionsView store={this.props.store}/></Col></Row>
                    </Tabs.TabPane>
                </Tabs>
            }
        </Drawer>
    }
}