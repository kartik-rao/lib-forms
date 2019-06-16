import { Tabs, Drawer, Row, Col } from "antd";
import { observer } from "mobx-react";
import {action} from "mobx";
import * as React from "react";
import { ConditionsView } from "./partials/ConditionsView";
import FieldPropertiesView from "./partials/PropertiesView";
import { ValidationView } from "./partials/ValidationView";
import {IEditorView} from "../common/IComponentEditorView";
import ChoiceOptionEditorView from "./partials/ChoiceOptionEditorView";
import { ChoiceOption } from "@kartikrao/lib-forms-core";

@observer
export class FieldEditorView extends React.Component<IEditorView,any> {
    constructor(props:any) {
        super(props);
    }

    @action.bound updateOptions(options: ChoiceOption[]) {
        this.props.store.editorStore.field.componentProps["options"] = options;
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
                    {['select', 'radiogroup', 'checkboxgroup'].indexOf(field.inputType) && <Tabs.TabPane tab="Options" key="4">
                        <Row>
                            <Col span={24}>
                            <ChoiceOptionEditorView type="select" items={field.componentProps['options']} onChange={this.updateOptions}/>
                            </Col>
                        </Row>
                    </Tabs.TabPane>}
                </Tabs>
            }
        </Drawer>
    }
}