import { Section } from "@kartikrao/lib-forms-core";
import { Button, Card, Form, notification, Slider } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import { editorStoreContext } from "../../../../store/EditorStoreProvider";
import { SectionLayoutPreview } from "./SectionLayoutPreview";

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
        span: 3,
        offset: 21,
      },
      sm: {
        span: 3,
        offset: 21,
      },
    },
};

const SectionLayoutEditorView: React.FC<FormComponentProps> = (props: FormComponentProps) => {
    const store = React.useContext(editorStoreContext);
    if(!store) throw new Error("Store is null");
    let colSpanMap = {}
    store.selectedSection.columns.map((col, index) => {
        colSpanMap[`col${index}`] = col.span;
    });
    const localStore = useLocalStore(() => ({
        gutter: store.selectedSection.gutter as number,
        columnSpanMap : colSpanMap,
        updateSpan : function (key, value) {
            this.columnSpanMap[key] = value;
        },
        updateGutter : function (value: number) {
            this.gutter = value;
        },
        handleSubmit : function (e) {
            e.preventDefault();
            e.stopPropagation();
            let {selectedSection: section} = store;
            let self = this;
            section.columns.map((column, index) => {
                let thisSpan = self.columnSpanMap[`col${index}`];
                if (column.span != thisSpan) {
                    console.log(`Setting column ${index} span to ${thisSpan}`)
                    column.span = thisSpan
                }
            })
            if(section.gutter != this.gutter) {
                section.gutter = this.gutter;
            }
            notification.info({message: `Section - ${section.name}`, description:`Saved section layout successfully`});
            return;
        }
    }));



    return useObserver(() => {
        return <Card size="small" title="Section Layout">
            <p>Assign 24 units (aliquots) across columns in a section, use gutter to space columns</p>
            <Form {...formItemLayout} onSubmit={(e) => localStore.handleSubmit(e)} layout={"horizontal"}>
            <Form.Item label="Gutter">
                {
                    props.form.getFieldDecorator('gutter', {
                        initialValue: localStore.gutter || 0,
                        rules: [{type: 'number'}]
                    })(<Slider step={8} max={48} onChange={(e) => localStore.updateGutter(parseInt(e.toString()))}/>)
                }
            </Form.Item>
            {store.selectedSection.columns.map((column, index) => {
                return <Form.Item label={`Column ${index+1} span`} key={index}>
                {
                    props.form.getFieldDecorator(`columnSpans[col${index}]`, {
                        initialValue: column.span || 0,
                        rules: [{type: 'number'}]
                    })(<Slider step={1} max={24} onChange={(e) => localStore.updateSpan(`col${index}`, e)}/>)
                }
                </Form.Item>
            })}
        <SectionLayoutPreview gutter={localStore.gutter} colspans={localStore.columnSpanMap}/>
        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" style={{marginTop: '15px'}} onClick={localStore.handleSubmit}>Apply</Button>
        </Form.Item>
        </Form>
    </Card>
    })
}

export default Form.create<FormComponentProps>()(SectionLayoutEditorView);