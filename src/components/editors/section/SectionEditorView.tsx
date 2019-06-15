import { Col, Drawer, Row, Tabs } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { IEditorView } from "../common/IComponentEditorView";
import SectionPropertiesEditorView from "./partials/SectionPropertiesEditorView";

const formItemLayout = {
    labelCol: {
      xs: { span: 12, offset: 4 },
      sm: { span: 8, offset: 4},
    },
    wrapperCol: {
      xs: { span: 16 },
      sm: { span: 12 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 4,
        offset: 20,
      },
      sm: {
        span: 4,
        offset: 20,
      },
    },
};

@observer
export class SectionEditorView extends React.Component<IEditorView, any> {

    constructor(props: IEditorView) {
        super(props);
    }

    render() {
        let {editorStore} = this.props.store;
        let section = editorStore.showSectionEditor ? editorStore.section : null;
        return section && <Drawer title={`Section "${section.name}" `}
            onClose={() => editorStore.setEditable(null)} visible={editorStore.showSectionEditor == true}
            width={700}
            style={{ overflow: 'hidden'}}>
            {   <Tabs size="small">
                    <Tabs.TabPane tab="Settings" key="1">
                        <Row><Col span={24}><SectionPropertiesEditorView store={this.props.store}/></Col></Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Content" key="2">
                        <Row><Col span={24}></Col></Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Layout" key="3">
                        <Row>
                            <Col span={24}>

                            </Col>
                        </Row>
                    </Tabs.TabPane>
                </Tabs>
            }
        </Drawer>
    }
}