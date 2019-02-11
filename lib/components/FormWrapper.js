import * as React from "react";
import 'airbnb-browser-shims';
import { Row, Col, Layout } from "antd";
import { FormFactory } from "../factory/form.factory";
import FormComponent from "./Form";
export { FormFactory };
export { FormComponent };
export class FormWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = { formData: FormFactory.createForm(this.props.formData) };
    }
    render() {
        const { formData } = this.state;
        return (React.createElement(Layout, { style: { height: "100vh" } },
            React.createElement(Row, null,
                React.createElement("br", null)),
            React.createElement(Row, { justify: "space-around" },
                React.createElement(Col, { span: formData.formLayoutOptions.wrapperSpan, offset: formData.formLayoutOptions.wrapperOffset },
                    React.createElement(FormComponent, { formData: formData }))),
            React.createElement(Row, null)));
    }
}
