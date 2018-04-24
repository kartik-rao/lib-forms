import * as React from "react";
import * as ReactDOM from "react-dom";

import {Steps, Form, Button, Input, Select, Radio, DatePicker, InputNumber, Card, Pagination, Row, Col, Checkbox} from "antd";

import {IFormProps} from "../models/form";
import {IPage} from "../models/page";
import {ISection} from "../models/section";
import {IField, RadioSelectCheckboxOption} from "../models/field";
import {FieldComponent} from "./component.field";

import '../app.css';

class FormComponent extends React.Component<IFormProps, any> {
    evaluators: any = {}
    constructor(props: IFormProps) {
        super(props);
        var state = {confirmDirty: false, currentPage: 0, numPages: props.content.pages.length}
        let self = this;
        props.content.allFields.forEach((f: IField) => {
            self.evaluators[`${f.id}`] = f.condition;
            state[`${f.id}`] = {result: f.condition.value(this.props.form)}
        });
        this.state = state;
    }

    handleSubmit(e) {
        e.preventDefault();
        let self = this;
        this.props.form.validateFields((err, values) => {
          if (!err) {
                let payload = Object.assign({payload: values}, {props: self.state.innerProps});
                console.log('Received values of form: ', payload);
          } else {
              // Send user to location of first error
              let locations = self.props.content.fieldLocation;
              let firstErrorPage = Object.keys(err).map((fieldId: string) => {
                return locations[fieldId].page;
              }).reduce((pn: number, initial: number) => {
                  return initial ? (pn < initial ? pn : initial) : pn;
              });
              setTimeout(() => {
                  self.setState({currentPage: firstErrorPage});
              })
          }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    onChange(id: string) {
        let self = this;
        const {getFieldValue, getFieldsValue, getFieldError, isFieldTouched, isFieldValidating} = this.props.form;
        setTimeout(() => {
            let deps = self.props.content.dependencyMap[id] || [];
            deps.forEach((d) => {
                let state = Object.assign({}, self.state)
                state[d].result =  self.evaluators[d].value(self.props.form)
                self.setState(state);
            });
        }, 0);
        return;
    }

    renderPage(page: IPage, pn: number) {
        const numSections = page.sections.length;
        return <div className="page" key={pn}>
            {page.sections.map((section: ISection, sn: number) => {
                return this.renderSection(section, sn);
            })}
        </div>
    }

    renderSection(section: ISection, sn: number) {
        const numFields = section.fields.length;
        let self = this;
        return <Card key={sn} title={section.name}>
            { section.fields.map((field: IField, fn: number) => {
                return self.renderField(field, fn);
            })}
        </Card>
    }

    renderField(field: IField, fn: number) {
        const {getFieldDecorator, getFieldError} = this.props.form;
        const decorator = getFieldDecorator(field.id, field.fieldOptions);

        const onChange = this.onChange.bind(this, field.id);
        const onBlur = this.handleConfirmBlur.bind(this);

        const enabled = this.state[field.id].result;
        field.fieldOptions.hidden = !enabled;
        const itemLayout = this.props.formItemLayout;

        return enabled ? <FieldComponent field={field} onBlur={onBlur} onChange={onChange}
                                decorator={decorator} key={fn} itemLayout={itemLayout}/> : ''
    }

    next() {
        const currentPage = this.state.currentPage + 1;
        this.setState({ currentPage });
    }

    prev() {
        const currentPage = this.state.currentPage - 1;
        this.setState({ currentPage });
    }

    render() {
        const { getFieldDecorator, getFieldError, getFieldsValue, setFieldsValue } = this.props.form;
        const numPages = this.props.content.pages.length;
        let self = this;
        const renderField = this.renderField;
        return (
            <div>
                    <Form onSubmit={this.handleSubmit.bind(this)} layout={this.props.layout}>
                        {
                            this.props.content.pages.map((page: IPage, pn: number) => {
                            let {numPages, currentPage} = this.state;
                            return <div className="page-wrapper" key={pn} style={{'visibility': currentPage == pn ? 'visible': 'hidden', display: currentPage == pn ? 'block': 'none'}}>
                                <div className="page-content">
                                    <Card title={page.title}>
                                        { this.renderPage(page, pn) }
                                    </Card>
                                </div>
                                <div className="page-action">
                                    <div>
                                        <Form.Item {...this.props.formItemLayout}>
                                            { <Button type="primary" htmlType="submit" className="action-button">Submit</Button> }
                                            { currentPage < numPages -1 && <Button type="primary"  className="action-button" onClick={() => this.next()}>Next</Button> }
                                            { currentPage > 0 && numPages > 1 &&  <Button type="primary"  className="action-button" onClick={() => this.prev()}>Prev</Button> }
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                        })}
                    </Form>
            </div>
        )
    }
}

export default Form.create()(FormComponent);