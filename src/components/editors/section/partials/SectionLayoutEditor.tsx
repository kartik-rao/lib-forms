import * as React from "react";
import { observer } from "mobx-react";
import { Drawer, Form, notification, Button, Input, Row, Col, Card, Slider } from "antd";
import { IEditorView } from "../../common/IComponentEditorView";
import { action, observable, computed, toJS } from "mobx";
import { FormComponentProps } from "antd/lib/form";
import { SectionLayoutPreview } from "./SectionLayoutPreview";
import { Section } from "@kartikrao/lib-forms-core";

export interface ISectionLayoutEditorViewProps extends FormComponentProps, IEditorView {
    section: Section
}

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

class SectionLayoutEditorView extends React.Component<ISectionLayoutEditorViewProps, any> {
    @observable gutter: number;
    @observable columnSpans : any;

    @action initialize() {
        let {section} = this.props;
        this.gutter = section.gutter;
        this.columnSpans = observable.map({});
        section.columns.map((col, index) => {
            this.columnSpans.set(`col${index}`, col.span);
        });
    }

    @computed get colspans() {
        let spans = [];
        this.columnSpans.forEach((value) => {
            spans.push(value);
        })
        return spans;
    }

    @action updateSpan = (key, value) => {
        this.columnSpans.set(key, value);
    }

    @action updateGutter = (value) => {
        this.gutter = value;
    }

    constructor(props : ISectionLayoutEditorViewProps) {
        super(props);
        this.initialize();
    }

    @action.bound handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let {section} = this.props.store.editorStore;
        section.columns.map((column, index) => {
            let thisSpan = this.columnSpans.get(`col${index}`);
            if (column.span != thisSpan) {
                console.log(`Setting column ${index} span to ${thisSpan}`)
                column.span = thisSpan
            }
        })
        if(section.gutter != this.gutter) {
            section.gutter = this.gutter;
        }
        notification.info({message: `Section - ${section.name}`,
            description:`Saved section layout successfully`});
        return;
    }

    render() {
        let {getFieldDecorator} = this.props.form;

        return <Card size="small" title="Section Layout">
            <p>Assign 24 units (aliquots) across columns in a section, use gutter to space columns</p>
            <Form {...formItemLayout} onSubmit={(e) => this.handleSubmit(e)} layout={"horizontal"}>
            <Form.Item label="Gutter">
                {
                    getFieldDecorator('gutter', {
                        initialValue: this.gutter || 0,
                        rules: [{type: 'number'}]
                    })(<Slider step={8} max={48} onChange={(e) => this.updateGutter(e)}/>)
                }
            </Form.Item>
            {this.props.section.columns.map((column, index) => {
                return <Form.Item label={`Column ${index+1} span`} key={index}>
                {
                    getFieldDecorator(`columnSpans[col${index}]`, {
                        initialValue: column.span || 0,
                        rules: [{type: 'number'}]
                    })(<Slider step={1} max={24} onChange={(e) => this.updateSpan(`col${index}`, e)}/>)
                }
                </Form.Item>
            })}
        <SectionLayoutPreview gutter={this.gutter} colspans={this.colspans}/>
        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" style={{marginTop: '15px'}} onClick={this.handleSubmit}>Apply</Button>
        </Form.Item>
        </Form>
    </Card>
    }
}

const WrappedSectionLayoutEditorView = Form.create<ISectionLayoutEditorViewProps>({ name: 'SectionLayoutEditorView' })(SectionLayoutEditorView);
export default WrappedSectionLayoutEditorView;