import 'airbnb-browser-shims';
import * as React from "react";
import RootStore from "../models/RootStore";
import { IFormProps } from "@kartikrao/lib-forms-core";
export declare class IEditableFormWrapperProps {
    formJSON: any;
}
export declare class IEditableFormWrapperState {
    store: RootStore;
    formProps: IFormProps;
}
export default class EditableFormWrapper extends React.Component<IEditableFormWrapperProps, IEditableFormWrapperState> {
    props: IEditableFormWrapperProps;
    constructor(props: IEditableFormWrapperProps);
    render(): JSX.Element;
}
