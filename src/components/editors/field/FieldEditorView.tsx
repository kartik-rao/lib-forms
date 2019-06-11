import { Tabs, Drawer, Row, Col } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { ConditionsView } from "./partials/ConditionsView";
import FieldPropertiesView from "./partials/FieldPropertiesView";
import { ValidationView } from "./partials/ValidationView";
import {IComponentEditorView} from "../IComponentEditorView";


@observer
export class EditorView extends React.Component<IComponentEditorView,any> {
    constructor(props:any) {
        super(props);
    }

    render() {
        let {editorStore} = this.props.store;
        let {field} = editorStore;

        return field && <Drawer title={`Field ${field.name} (id=${field.id} class=${field.className})`}
            width={800} onClose={() => editorStore.setEditable(null)} visible={editorStore.showFieldEditor}
            style={{ overflow: 'auto', height: 'calc(100% - 108px)', paddingBottom: '108px' }}>
            {editorStore.field &&
                <Tabs>
                    <Tabs.TabPane tab="Properties" key="1">
                        <Row><Col span={20} offset={2}><FieldPropertiesView store={this.props.store}/></Col></Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Validation" key="2">
                        <Row><Col span={20} offset={2}><ValidationView store={this.props.store}/></Col></Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Condition" key="3">
                        <Row><Col span={20} offset={2}><ConditionsView store={this.props.store}/></Col></Row>
                    </Tabs.TabPane>
                </Tabs>
            }
        </Drawer>
    }
}