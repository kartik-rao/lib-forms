import { Col, Drawer, Row, Tabs } from "antd";
import { useObserver } from "mobx-react";
import * as React from "react";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
import SectionLayoutEditor from "./partials/SectionLayoutEditor";
import SectionPropertiesEditorView from "./partials/SectionPropertiesEditorView";

export const SectionEditorView : React.FC = (props) => {
    const store = React.useContext(editorStoreContext);
    if(!store) throw new Error("Store is null");
    return useObserver(() => {
        return store.showSectionEditor && store.selectedSection && <Drawer title={`Section "${store.selectedSection.name}" `}
            onClose={() => store.setEditable(null)} visible={store.showSectionEditor == true}
            width={700}
            style={{ overflow: 'hidden'}}>
            {   <Tabs size="small">
                    <Tabs.TabPane tab="Settings" key="1">
                        <Row><Col span={24}><SectionPropertiesEditorView /></Col></Row>
                    </Tabs.TabPane>
                    {store.selectedSection.columns.length > 0 && <Tabs.TabPane tab="Layout" key="2">
                        <Row>
                            <Col span={24}>
                                <SectionLayoutEditor />
                            </Col>
                        </Row>
                    </Tabs.TabPane>}
                </Tabs>
            }
        </Drawer>
    });
}