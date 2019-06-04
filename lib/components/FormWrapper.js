import 'airbnb-browser-shims';
import { Col, Layout, Row } from "antd";
import * as React from "react";
import { FormFactory } from "../factory/form.factory";
import FormComponent from "./Form";
import RootStore from "../models/RootStore";
export { FormFactory };
export { FormComponent };
export class IFormWrapperProps {
}
export class IFormWrapperState {
}
export class FormWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.props.store = new RootStore(this.props.formJSON);
    }
    render() {
        let { formData } = this.props.store;
        return (React.createElement(Layout, { style: { height: "100vh" } },
            React.createElement(Row, null,
                React.createElement("br", null)),
            React.createElement(Row, { justify: "space-around" },
                React.createElement(Col, { span: formData.formLayoutOptions.wrapperSpan, offset: formData.formLayoutOptions.wrapperOffset },
                    React.createElement(FormComponent, { formData: formData })))));
    }
}
