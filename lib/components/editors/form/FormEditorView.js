import { Col, Drawer, Row, Tabs } from "antd";
import { useObserver } from "mobx-react";
import * as React from "react";
import FormContentSettingsView from "./partials/FormContentSettingsView";
import FormLayoutView from "./partials/FormLayoutView";
import FormPropertiesEditorView from "./partials/FormPropertiesEditorView";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
export const FormEditorView = () => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    return useObserver(() => {
        return store.showFormEditor ? React.createElement(Drawer, { title: `Form "${store.formStore.form.name}" `, onClose: () => store.setFormEditorVisible(false), visible: store.showFormEditor == true, width: 700, style: { overflow: 'hidden' } }, React.createElement(Tabs, { size: "small" },
            React.createElement(Tabs.TabPane, { tab: "Settings", key: "1" },
                React.createElement(Row, null,
                    React.createElement(Col, { span: 24 },
                        React.createElement(FormPropertiesEditorView, null)))),
            React.createElement(Tabs.TabPane, { tab: "Content", key: "2" },
                React.createElement(Row, null,
                    React.createElement(Col, { span: 24 },
                        React.createElement(FormContentSettingsView, null)))),
            React.createElement(Tabs.TabPane, { tab: "Layout", key: "3" },
                React.createElement(Row, null,
                    React.createElement(Col, { span: 24 },
                        React.createElement(FormLayoutView, null)))))) : React.createElement(React.Fragment, null);
    });
};
// @observer
// export class FormEditorViewOld extends React.Component<any, any> {
//     render() {
//         const store = React.useContext(editorStoreContext);
//         if(!store) throw new Error("Store is null");
//         let form = store.showFormEditor ? toJS(store.formStore.form) : null;
//         return form && <Drawer title={`Form "${form.name}" `}
//             onClose={() => store.setFormEditorVisible(false)} visible={store.showFormEditor == true}
//             width={700}
//             style={{ overflow: 'hidden'}}>
//             {   <Tabs size="small">
//                     <Tabs.TabPane tab="Settings" key="1">
//                         <Row><Col span={24}><FormPropertiesEditorView /></Col></Row>
//                     </Tabs.TabPane>
//                     <Tabs.TabPane tab="Content" key="2">
//                         <Row><Col span={24}><FormContentEditorView /></Col></Row>
//                     </Tabs.TabPane>
//                     <Tabs.TabPane tab="Layout" key="3">
//                         <Row>
//                             <Col span={24}>
//                                 <FormLayoutView/>
//                             </Col>
//                         </Row>
//                     </Tabs.TabPane>
//                 </Tabs>
//             }
//         </Drawer>
//     }
// }
