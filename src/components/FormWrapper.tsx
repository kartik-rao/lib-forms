import 'airbnb-browser-shims';
import { Card, Col, Layout, Row } from "antd";
import * as React from "react";
import { FormFactory } from "../factory/form.factory";
import FormComponent from "./Form";
import { IFormProps } from '@adinfinity/ai-core-forms';

export { FormFactory };
export { FormComponent };

export class IFormWrapperProps {
    formJSON: any;
}

export class IFormWrapperState {
    formProps: IFormProps
}

export class FormWrapper extends React.Component <IFormWrapperProps, IFormWrapperState> {
    props: IFormWrapperProps;
    constructor(props: IFormWrapperProps) {
        super(props);
        this.state = {formProps: FormFactory.createForm(this.props.formJSON)};
    }

    render() {
        const {formProps} = this.state;
        return (
            <Layout style={{height:"100vh"}}>
                <Row><br/></Row>
                <Row justify={"space-around"}>
                    <Col span={formProps.formLayoutOptions.wrapperSpan} offset={formProps.formLayoutOptions.wrapperOffset}>
                        <FormComponent formData={formProps}/>
                    </Col>
                </Row>
            </Layout>
        );
    }
}