import 'airbnb-browser-shims';
import * as React from "react";
import RootStore from "../models/RootStore";
export declare class IFormWrapperProps {
    store: RootStore;
}
export declare class FormWrapper extends React.Component<IFormWrapperProps, any> {
    props: IFormWrapperProps;
    constructor(props: IFormWrapperProps);
    render(): JSX.Element;
}
