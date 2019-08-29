import { Col, Drawer, Row, Tabs } from "antd";
import { useObserver } from "mobx-react";
import * as React from "react";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
import SectionLayoutEditor from "./partials/SectionLayoutEditor";
import SectionPropertiesEditorView from "./partials/SectionPropertiesEditorView";
export const SectionEditorView = (props) => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    return useObserver(() => {
        return store.showSectionEditor && store.selectedSection && React.createElement(Drawer, { title: `Section "${store.selectedSection.name}" `, onClose: () => store.setEditable(null), visible: store.showSectionEditor == true, width: 700, style: { overflow: 'hidden' } }, React.createElement(Tabs, { size: "small" },
            React.createElement(Tabs.TabPane, { tab: "Settings", key: "1" },
                React.createElement(Row, null,
                    React.createElement(Col, { span: 24 },
                        React.createElement(SectionPropertiesEditorView, null)))),
            React.createElement(Tabs.TabPane, { tab: "Layout", key: "2" },
                React.createElement(Row, null,
                    React.createElement(Col, { span: 24 },
                        React.createElement(SectionLayoutEditor, { section: store.selectedSection }))))));
    });
};
// @observer
// export class SectionEditorViewOld extends React.Component<any, any> {
//     render() {
//         let {store} = this.props;
//         let section = store.showSectionEditor ? store.selectedSection : null;
//         return section && <Drawer title={`Section "${section.name}" `}
//             onClose={() => store.setEditable(null)} visible={store.showSectionEditor == true}
//             width={700}
//             style={{ overflow: 'hidden'}}>
//             {   <Tabs size="small">
//                     <Tabs.TabPane tab="Settings" key="1">
//                         <Row><Col span={24}><SectionPropertiesEditorView /></Col></Row>
//                     </Tabs.TabPane>
//                     <Tabs.TabPane tab="Layout" key="2">
//                         <Row>
//                             <Col span={24}>
//                                 <SectionLayoutEditor section={section}/>
//                             </Col>
//                         </Row>
//                     </Tabs.TabPane>
//                 </Tabs>
//             }
//         </Drawer>
//     }
// }
