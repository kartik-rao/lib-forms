import { IPage, IFormProps } from "@kartikrao/lib-forms-core";
import { Button, Card, Col, Form, Row, Steps } from "antd";
import * as React from "react";
import { FormStateHelper } from "../helpers/FormStateHelper";
import { PageComponent } from "./Page";
import {FormComponentProps} from "antd/lib/form/Form";
import Page from "@kartikrao/lib-forms-core/lib/models/page";
import RootStore from "../models/RootStore";
import { observer } from "mobx-react";

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export interface IFormComponentProps extends FormComponentProps {
    store: RootStore;
}

@observer
class FormComponent extends React.Component<IFormComponentProps, any> {
    evaluators: any = {};
    props: IFormComponentProps;

    constructor(props: IFormComponentProps) {
        super(props);
        this.props.store = props.store;
        console.log("Inside Form Props", this.props);
    }

    next() {
        console.log("nextPage");
        let {store} = this.props;
        store.formStore.nextPage();
        // const currentPage = this.state.currentPage;
        // if (!this.props.formData.formLayoutOptions.validationDisablesPaging) {
        //     this.setState({ currentPage: currentPage + 1 });
        //     return;
        // }
        // this.props.form.validateFields(this.state.fieldMeta.pageFields[currentPage].names, (err: any) => {
        //     if(!err) {
        //         self.setState({ currentPage: currentPage + 1 });
        //     }
        // });
    }

    prev() {
        console.log("prevPage");
        // const currentPage = this.state.currentPage - 1;
        // this.setState({ currentPage });

        let {store} = this.props;
        store.formStore.nextPage();
    }

    onChange(id: string) {
        let self = this;
        console.log("onChange", id);
        setTimeout(() => {
            let deps = self.state.dependencies[id] || [];
            deps.forEach((d) => {
                let state = Object.assign({}, self.state)
                state.conditionals[d].result =  self.evaluators[d].value(self.props.form.getFieldValue)
                self.setState(state);
            });
        }, 0);
        return;
    }

    handleConfirmBlur = (e) => {
        console.log("handleConfirmBlur");
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    handleSubmit = (e : React.FormEvent<any>) => {
        console.log("handleSubmit");
        e.preventDefault();
        let self = this;
        this.props.form.validateFields((err, values) => {
          if (!err) {
                let payload = Object.assign({payload: values}, {props: self.state.innerProps});
                console.log('Received values of form: ', payload);
          } else {
              // Send user to location of first error
              let {locations} = self.state.fieldMeta;
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

    eventHooks = (fieldId: string) => {
        return {
            onChange: this.onChange.bind(this, fieldId),
            onBlur : this.handleConfirmBlur.bind(this)
        }
    }

    render() {
        let {store} = this.props;
        let {formStore} = this.props.store;
        let {form} = formStore;

        return (<div className="form-wrapper">
            {form.content.title &&
                <Card><h2>{form.content.title}</h2><br/><h3>{form.content.subtitle}</h3></Card>
            }
            {form.formLayoutOptions.showSteps && <Row>
                <Col span={24}>
                    <Card>
                        <Steps size="small" current={this.state.currentPage}>
                            {form.content.pages.map((page: IPage, pn: number) => {
                                return <Steps.Step title={page.title} key={pn}/>
                            })}
                        </Steps>
                    </Card>
                </Col>
            </Row>}
            <Row>
                <Col span={24}>
                    <Form onSubmit={this.handleSubmit} layout={form.layout} >
                        {
                            form.content.pages.map((page: Page, pn: number) => {
                                let {currentPage} = this.state;
                                return <div className="page-wrapper" key={pn} style={{'visibility': currentPage == pn ? 'visible': 'hidden', display: currentPage == pn ? 'block': 'none'}}>
                                    <PageComponent page={page} store={store} index={pn} eventHooks={this.eventHooks}></PageComponent>
                                </div>
                            })
                        }
                        <div className="page-actions">
                            <Card>
                                <Row>
                                    <Col span={24} style={{ textAlign: 'right' }}>
                                        { <Form.Item>
                                            <Button disabled={hasErrors(this.props.form.getFieldsError())} type="primary" style={{ marginLeft: 8 }} htmlType="submit" className="action-button">Submit</Button>
                                            { this.state.currentPage < this.state.numPages -1 && <Button type="primary"  style={{ marginLeft: 8 }} className="action-button" onClick={() => this.next()}>Next</Button> }
                                            { this.state.currentPage > 0 && this.state.numPages > 1 && <Button type="primary" className="action-button" onClick={() => this.prev()}>Prev</Button> }
                                        </Form.Item> }
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </Form>

                </Col>
            </Row>
        </div>
        )
    }
}

export default Form.create<IFormComponentProps>()(FormComponent);