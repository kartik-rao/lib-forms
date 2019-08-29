import { ChoiceOption } from "@kartikrao/lib-forms-core";
import { Col, Drawer, Row, Tabs } from "antd";
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
import ChoiceOptionEditorView from "./partials/ChoiceOptionEditorView";
import ConditionsView from "./partials/ConditionsView";
import FieldPropertiesView from "./partials/PropertiesView";
import ValidationView from "./partials/ValidationView";

export const FieldEditorView : React.FC<any> = () => {
    const editorStore = React.useContext(editorStoreContext);
    if(!editorStore) throw new Error("Store is null");
    const localStore = useLocalStore(() => ({
        updateOptions: function(options: ChoiceOption[]) {
            editorStore.selectedField.componentProps["options"] = options;
        },
        onOk: function () {
            editorStore.setEditable(null);
        },
        onCancel: function () { }
    }));

    return useObserver(() => {
        return editorStore.selectedField && <Drawer title={`Field ${editorStore.selectedField.name} (id=${editorStore.selectedField.id||''} class=${editorStore.selectedField.className})`}
        width={700} onClose={() => editorStore.setEditable(null)} visible={editorStore.showFieldEditor}
        style={{ overflow: 'auto', height: 'calc(80% - 108px)', paddingBottom: '108px' }}>
        {
            <Tabs size="small">
                <Tabs.TabPane tab="Properties" key="1">
                    <Row><Col span={24}><FieldPropertiesView/></Col></Row>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Validation" key="2">
                    <Row><Col span={24}><ValidationView/></Col></Row>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Condition" key="3">
                    <Row><Col span={24}><ConditionsView/></Col></Row>
                </Tabs.TabPane>
                {['select', 'radiogroup', 'checkboxgroup'].indexOf(editorStore.selectedField.inputType) > -1 && <Tabs.TabPane tab="Options" key="4">
                    <Row>
                        <Col span={24}>
                        <ChoiceOptionEditorView type="select" items={editorStore.selectedField.componentProps['options']} onChange={localStore.updateOptions}/>
                        </Col>
                    </Row>
                </Tabs.TabPane>}
            </Tabs>
        }
    </Drawer>
    });
}