import { Logger } from "@kartikrao/lib-logging";
import 'airbnb-browser-shims';
import { Col, Layout, Row, Card } from "antd";
import DevTools from 'mobx-react-devtools';
import * as React from "react";
import RootStore from "../models/RootStore";
import ComponentTree from "./editable/ComponentTree";
import FormComponent from "./Form";
import { FormFactory } from "./FormWrapper";
const logger = Logger.getInstance(["ai-lib-forms", "EditableFormWrapper"], 5);
const debug = window.location.href.indexOf("localhost") > -1;
export class IEditableFormWrapperProps {
}
export class IEditableFormWrapperState {
}
export default class EditableFormWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            store: new RootStore(props.formJSON),
            formProps: FormFactory.createForm(this.props.formJSON)
        };
    }
    render() {
        const { formProps, store } = this.state;
        console.log("Store Instance", store);
        console.log("Form Props", formProps);
        return (React.createElement(Layout, { style: { height: "100vh" } },
            React.createElement(Row, null, debug && React.createElement(DevTools, null)),
            React.createElement(Row, { justify: "space-around" },
                React.createElement(Col, { span: 6, offset: 1 },
                    React.createElement(Card, { title: "Outline" },
                        React.createElement(ComponentTree, { store: store, formData: formProps }))),
                React.createElement(Col, { span: 15, offset: 1 },
                    React.createElement(FormComponent, { formData: formProps })))));
    }
}
