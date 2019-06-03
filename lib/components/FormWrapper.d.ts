import * as React from "react";
import 'airbnb-browser-shims';
import { FormFactory } from "../factory/form.factory";
import FormComponent from "./Form";
export { FormFactory };
export { FormComponent };
export declare class IFormWrapperProps {
    formJSON: any;
}
export declare class FormWrapper extends React.Component<IFormWrapperProps, any> {
    props: IFormWrapperProps;
    constructor(props: IFormWrapperProps);
    render(): JSX.Element;
}
