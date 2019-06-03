import 'airbnb-browser-shims';
import * as React from "react";
import { FormFactory } from "../factory/form.factory";
import FormComponent from "./Form";
import { IFormProps } from '@adinfinity/ai-core-forms';
export { FormFactory };
export { FormComponent };
export declare class IFormWrapperProps {
    formJSON: any;
}
export declare class IFormWrapperState {
    formProps: IFormProps;
}
export declare class FormWrapper extends React.Component<IFormWrapperProps, IFormWrapperState> {
    props: IFormWrapperProps;
    constructor(props: IFormWrapperProps);
    render(): JSX.Element;
}
