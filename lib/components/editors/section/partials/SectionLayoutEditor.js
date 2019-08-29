import { Button, Card, Form, notification, Slider } from "antd";
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import { editorStoreContext } from "../../../../store/EditorStoreProvider";
import { SectionLayoutPreview } from "./SectionLayoutPreview";
const formItemLayout = {
    labelCol: {
        xs: { span: 12, offset: 4 },
        sm: { span: 8, offset: 4 },
    },
    wrapperCol: {
        xs: { span: 16 },
        sm: { span: 12 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 3,
            offset: 21,
        },
        sm: {
            span: 3,
            offset: 21,
        },
    },
};
const SectionLayoutEditorView = (props) => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    const localStore = useLocalStore(() => ({
        gutter: (props.section ? props.section.gutter : null),
        columnSpans: {},
        get colspans() {
            let spans = [];
            Object.keys(this.columnSpans).forEach((key) => {
                spans.push(this.columnSpans[key]);
            });
            // this.columnSpans.forEach((value) => {
            //     spans.push(value);
            // })
            return spans;
        },
        updateSpan: function (key, value) {
            this.columnSpans[key] = value;
        },
        updateGutter: function (value) {
            this.gutter = value;
        },
        handleSubmit: function (e) {
            e.preventDefault();
            e.stopPropagation();
            let { selectedSection: section } = store;
            section.columns.map((column, index) => {
                let thisSpan = this.columnSpans[`col${index}`];
                if (column.span != thisSpan) {
                    console.log(`Setting column ${index} span to ${thisSpan}`);
                    column.span = thisSpan;
                }
            });
            if (section.gutter != this.gutter) {
                section.gutter = this.gutter;
            }
            notification.info({ message: `Section - ${section.name}`,
                description: `Saved section layout successfully` });
            return;
        }
    }));
    return useObserver(() => {
        localStore.columnSpans = {};
        props.section && props.section.columns.map((col, index) => {
            localStore.columnSpans[`col${index}`] = col.span;
        });
        return React.createElement(Card, { size: "small", title: "Section Layout" },
            React.createElement("p", null, "Assign 24 units (aliquots) across columns in a section, use gutter to space columns"),
            React.createElement(Form, Object.assign({}, formItemLayout, { onSubmit: (e) => localStore.handleSubmit(e), layout: "horizontal" }),
                React.createElement(Form.Item, { label: "Gutter" }, props.form.getFieldDecorator('gutter', {
                    initialValue: localStore.gutter || 0,
                    rules: [{ type: 'number' }]
                })(React.createElement(Slider, { step: 8, max: 48, onChange: (e) => localStore.updateGutter(e) }))),
                props.section.columns.map((column, index) => {
                    return React.createElement(Form.Item, { label: `Column ${index + 1} span`, key: index }, props.form.getFieldDecorator(`columnSpans[col${index}]`, {
                        initialValue: column.span || 0,
                        rules: [{ type: 'number' }]
                    })(React.createElement(Slider, { step: 1, max: 24, onChange: (e) => localStore.updateSpan(`col${index}`, e) })));
                }),
                React.createElement(SectionLayoutPreview, { gutter: localStore.gutter, colspans: localStore.colspans }),
                React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                    React.createElement(Button, { type: "primary", htmlType: "submit", style: { marginTop: '15px' }, onClick: localStore.handleSubmit }, "Apply"))));
    });
};
export default Form.create()(SectionLayoutEditorView);
// class SectionLayoutEditorViewOld extends React.Component<ISectionLayoutEditorViewProps, any> {
//     @observable gutter: number;
//     @observable columnSpans : any;
//     @action initialize() {
//         let {section} = this.props;
//         this.gutter = section.gutter;
//         this.columnSpans = observable.map({});
//         section.columns.map((col, index) => {
//             this.columnSpans.set(`col${index}`, col.span);
//         });
//     }
//     @computed get colspans() {
//         let spans = [];
//         this.columnSpans.forEach((value) => {
//             spans.push(value);
//         })
//         return spans;
//     }
//     @action updateSpan = (key, value) => {
//         this.columnSpans.set(key, value);
//     }
//     @action updateGutter = (value) => {
//         this.gutter = value;
//     }
//     constructor(props : ISectionLayoutEditorViewProps) {
//         super(props);
//         this.initialize();
//     }
//     @action.bound handleSubmit = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         let {selectedSection: section} = this.props.store;
//         section.columns.map((column, index) => {
//             let thisSpan = this.columnSpans.get(`col${index}`);
//             if (column.span != thisSpan) {
//                 console.log(`Setting column ${index} span to ${thisSpan}`)
//                 column.span = thisSpan
//             }
//         })
//         if(section.gutter != this.gutter) {
//             section.gutter = this.gutter;
//         }
//         notification.info({message: `Section - ${section.name}`,
//             description:`Saved section layout successfully`});
//         return;
//     }
//     render() {
//         let {getFieldDecorator} = this.props.form;
//         return <Card size="small" title="Section Layout">
//             <p>Assign 24 units (aliquots) across columns in a section, use gutter to space columns</p>
//             <Form {...formItemLayout} onSubmit={(e) => this.handleSubmit(e)} layout={"horizontal"}>
//             <Form.Item label="Gutter">
//                 {
//                     getFieldDecorator('gutter', {
//                         initialValue: this.gutter || 0,
//                         rules: [{type: 'number'}]
//                     })(<Slider step={8} max={48} onChange={(e) => this.updateGutter(e)}/>)
//                 }
//             </Form.Item>
//             {this.props.section.columns.map((column, index) => {
//                 return <Form.Item label={`Column ${index+1} span`} key={index}>
//                 {
//                     getFieldDecorator(`columnSpans[col${index}]`, {
//                         initialValue: column.span || 0,
//                         rules: [{type: 'number'}]
//                     })(<Slider step={1} max={24} onChange={(e) => this.updateSpan(`col${index}`, e)}/>)
//                 }
//                 </Form.Item>
//             })}
//         <SectionLayoutPreview gutter={this.gutter} colspans={this.colspans}/>
//         <Form.Item {...tailFormItemLayout}>
//             <Button type="primary" htmlType="submit" style={{marginTop: '15px'}} onClick={this.handleSubmit}>Apply</Button>
//         </Form.Item>
//         </Form>
//     </Card>
//     }
// }
// const WrappedSectionLayoutEditorView = Form.create<ISectionLayoutEditorViewProps>({ name: 'SectionLayoutEditorView' })(SectionLayoutEditorView);
// export default WrappedSectionLayoutEditorView;
