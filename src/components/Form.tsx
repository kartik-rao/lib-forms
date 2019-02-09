import * as React from "react";
import {Steps, Form, Button,  Card, Row, Col} from "antd";
import {IPage, IField} from "@adinfinity/ai-core-forms";
import {PageComponent} from "./Page";

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class FormComponent extends React.Component<any, any> {
    evaluators: any = {};

    constructor(props: any) {
        super(props);
        let state = {
            currentPage: props.content && props.content.pages.length > 0 ? 0 : 0,
            numPages: props.content && props.content.pages.length > 0 ? props.content.pages.length : 0,
            confirmDirty: false,
            ...this.updateConditionEvaluators(props.content.allFields)
        };

        this.state = state;
        console.log(state)
    }

    updateConditionEvaluators(fields: any[]) : any {
        let conditionAncestors = {};
        let state = {dependencies: {}, conditionals: {}};
        let self = this;
        fields.forEach((f: IField) => {
            if(f.condition) {
                self.evaluators[`${f.id}`] = f.condition;
                state.conditionals[`${f.id}`] = {result: f.condition.value(this.props.form.getFieldValue)}
                if (f.condition.ancestors) {
                    conditionAncestors[f.id] = f.condition.ancestors;
                }
            }
        });

        Object.keys(conditionAncestors).forEach((f) => {
            let ancestors = conditionAncestors[f];
            ancestors.forEach((a: string) => {
                state.dependencies[a] = state.dependencies[a] ? state.dependencies[a] : [];
                state.dependencies[a].push(f);
            });
        });

        return state;
    }

    next() {
        console.log("nextPage");
        let self = this;
        const currentPage = this.state.currentPage;
        if (!this.props.formLayoutOptions.validationDisablesPaging) {
            this.setState({ currentPage: currentPage + 1 });
            return;
        }
        this.props.form.validateFields(this.props.content.pages[currentPage].fieldNames, (err: any) => {
            if(!err) {
                self.setState({ currentPage: currentPage + 1 });
            }
        });
    }

    prev() {
        console.log("prevPage");
        const currentPage = this.state.currentPage - 1;
        this.setState({ currentPage });
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
        console.log("handleConfirmBlue");
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

    eventHooks = (fieldId: string) => {
        return {
            onChange: this.onChange.bind(this, fieldId),
            onBlur : this.handleConfirmBlur.bind(this)
        }
    }

    render() {
        return (<div className="form-wrapper">
            {this.props.content.title &&
                <Card><h2>{this.props.content.title}</h2><br/><h3>{this.props.content.subtitle}</h3></Card>
            }
            {this.props.formLayoutOptions.showSteps && <Row>
                <Col span={24}>
                    <Card>
                        <Steps size="small" current={this.state.currentPage}>
                            {this.props.content.pages.map((page: IPage, pn: number) => {
                                return <Steps.Step title={page.title} key={pn}/>
                            })}
                        </Steps>
                    </Card>
                </Col>
            </Row>}
            <Row>
                <Col span={24}>
                    <Form onSubmit={this.handleSubmit} layout={this.props.layout} >
                        {
                            this.props.content.pages.map((page: IPage, pn: number) => {
                                let {currentPage} = this.state;
                                let {formLayoutOptions} = this.props;
                                return <div className="page-wrapper" key={pn} style={{'visibility': currentPage == pn ? 'visible': 'hidden', display: currentPage == pn ? 'block': 'none'}}>
                                    <PageComponent page={page} conditionals={this.state.conditionals} index={pn} formLayout={formLayoutOptions} decorators={this.props.form} eventHooks={this.eventHooks}></PageComponent>
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

export default Form.create()(FormComponent);