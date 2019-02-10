import * as React from "react";
import * as ReactDOM from "react-dom";

import 'airbnb-browser-shims';

import {Row, Col, Layout, Button} from "antd";
import {FormFactory} from "./factory/form.factory";
import FormComponent from "./components/Form";

export {FormFactory};
export {FormComponent};

export class FormWrapper extends React.Component <any, any> {

    constructor(props: any) {
        super(props);
        this.state = {form: FormFactory.createForm(props.form)};
    }

    render() {
        const { form } = this.state;
        return (
            <Layout style={{height:"100vh"}}>
                <Row><br/></Row>
                <Row justify="space-around">
                    <Col span={form.formLayoutOptions.wrapperSpan} offset={form.formLayoutOptions.wrapperOffset}>
                        <FormComponent {...form}/>
                        <Button type="primary" style={{ marginLeft: 8 }} onClick={this.addPage} className="action-button">Add Content</Button>
                        <Button type="primary" style={{ marginLeft: 8 }} onClick={this.updateProps} className="action-button">Update Props</Button>
                    </Col>
                </Row>
                <Row>


                </Row>
            </Layout>
        );
    }

    addPage = () => {
        console.log("Ad Page")
        let currentState = this.state.form;
        currentState.content.pages.splice(3, 0, {
            title: 'Page 4',
            sections: [
                {
                    name: "A Section",
                    columns: [
                        {
                            id: 1,
                            name: 's1c1',
                            title: 'Section 1 - Column 1',
                            fields: [{
                                id: "f7", name: "f7", type: "input", inputType: "text", label: "Text Label F7",
                                placeholder: 'Placeholder Text F7',
                                fieldOptions: {
                                    rules: [
                                        { type: 'string', required: true, message: 'Required validation message' },
                                        { min: 2, message: "MinLength=2 validation message" },
                                    ]
                            }
                        }]}
                    ]
                }
            ]
        });
        this.setState({form: currentState});

    }

    addSection(pageNo:number, index:number, section: any) {
        let currentState = this.state.form;
    }

    updateProps = () => {
        let {form} = this.state;
        form.content.title = "new title";
        this.setState({form: form});
    }

}

export function render (props: any, target: string) {
    ReactDOM.render(<FormWrapper {...props}/>, document.querySelector(target));
}
