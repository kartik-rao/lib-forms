import { Col, Drawer, Row, Tabs } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { IEditorView } from "../common/IComponentEditorView";
import FormContentEditorView from "./partials/FormContentEditorView";

@observer
export class FormEditorView extends React.Component<IEditorView, any> {

    render() {
        let {editorStore} = this.props.store;
        let form = editorStore.formEditorVisible ? toJS(editorStore.formStore.form) : null;

        return form && <Drawer title={`Form "${form.name}" `}
            onClose={() => editorStore.setFormEditorVisible(false)} visible={editorStore.formEditorVisible == true}
            width={500}
            style={{ overflow: 'hidden'}}>
            {   <Tabs size="small">
                    <Tabs.TabPane tab="Properties" key="1">
                        <Row><Col span={24}><FormContentEditorView store={this.props.store}/></Col></Row>
                    </Tabs.TabPane>
                </Tabs>
            }
        </Drawer>
    }
}
