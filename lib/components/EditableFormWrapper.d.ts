import * as React from "react";
import 'airbnb-browser-shims';
export declare class IEditableFormWrapperProps {
    formJSON: any;
}
export default class EditableFormWrapper extends React.Component<IEditableFormWrapperProps, any> {
    props: IEditableFormWrapperProps;
    constructor(props: IEditableFormWrapperProps);
    render(): JSX.Element;
}
