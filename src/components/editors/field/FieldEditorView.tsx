import { ChoiceOption } from "@kartikrao/lib-forms-core";
import { Col, Drawer, Row, Tabs } from "antd";
import { action } from "mobx";
import { observer, useLocalStore } from "mobx-react";
import * as React from "react";
import { IEditorView } from "../common/IComponentEditorView";
import ChoiceOptionEditorView from "./partials/ChoiceOptionEditorView";
import ConditionsView from "./partials/ConditionsView";
import FieldPropertiesView from "./partials/PropertiesView";
import { ValidationView } from "./partials/ValidationView";
import { editorStoreContext } from "../../../store/EditorStoreProvider";


export const FieldEditorView : React.FC<any> = () => {
    const store = React.useContext(editorStoreContext);
    if(!store) throw new Error("Store is null");
    const localStore = useLocalStore(() => ({
        updateOptions: function(options: ChoiceOption[]) {
            store.selectedField.componentProps["options"] = options;
        },
        onOk() {
            store.setEditable(null);
        },
        onCancel() {

        }
    }));

    return store.selectedField && <Drawer title={`Field ${store.selectedField.name} (id=${store.selectedField.id||''} class=${store.selectedField.className})`}
    width={700} onClose={() => store.setEditable(null)} visible={store.showFieldEditor}
    style={{ overflow: 'auto', height: 'calc(80% - 108px)', paddingBottom: '108px' }}>
    {
        <Tabs size="small">
            <Tabs.TabPane tab="Properties" key="1">
                <Row><Col span={24}><FieldPropertiesView/></Col></Row>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Validation" key="2">
                <Row><Col span={24}><ValidationView store={store}/></Col></Row>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Condition" key="3">
                <Row><Col span={24}><ConditionsView store={store}/></Col></Row>
            </Tabs.TabPane>
            {['select', 'radiogroup', 'checkboxgroup'].indexOf(store.selectedField.inputType) > -1 && <Tabs.TabPane tab="Options" key="4">
                <Row>
                    <Col span={24}>
                    <ChoiceOptionEditorView type="select" items={store.selectedField.componentProps['options']} onChange={localStore.updateOptions}/>
                    </Col>
                </Row>
            </Tabs.TabPane>}
        </Tabs>
    }
</Drawer>
}
