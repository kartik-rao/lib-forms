import { ChoiceOption } from "@kartikrao/lib-forms-core";
import { Col, Drawer, Row, Tabs } from "antd";
import { action } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { IEditorView } from "../common/IComponentEditorView";
import ChoiceOptionEditorView from "./partials/ChoiceOptionEditorView";
import ConditionsView from "./partials/ConditionsView";
import FieldPropertiesView from "./partials/PropertiesView";
import { ValidationView } from "./partials/ValidationView";

@observer
export class FieldEditorView extends React.Component<IEditorView,any> {
    constructor(props:any) {
        super(props);
    }

    @action.bound updateOptions(options: ChoiceOption[]) {
        this.props.store.selectedField.componentProps["options"] = options;
    }

    @action onOk() {
        this.props.store.setEditable(null);
    }

    @action onCancel() {

    }

    render() {
        let {store} = this.props;
        let {selectedField: field} = store;
        return field && <Drawer title={`Field ${field.name} (id=${field.id||''} class=${field.className})`}
            width={700} onClose={() => store.setEditable(null)} visible={store.showFieldEditor}
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
                    {['select', 'radiogroup', 'checkboxgroup'].indexOf(field.inputType) > -1 && <Tabs.TabPane tab="Options" key="4">
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