import * as React from "react";
import './app.css';
import "antd/dist/antd.css";
import 'airbnb-browser-shims';
import { FormFactory } from "./factory/form.factory";
import FormComponent from "./components/component.form";
export { FormFactory };
export { FormComponent };
export declare class FormWrapper extends React.Component<any, any> {
    props: any;
    state: any;
    constructor(props: any);
    render(): JSX.Element;
}
export declare function render(props: any, target: string): void;
