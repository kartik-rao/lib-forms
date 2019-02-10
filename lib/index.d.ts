import * as React from "react";
import 'airbnb-browser-shims';
import { FormFactory } from "./factory/form.factory";
import FormComponent from "./components/Form";
export { FormFactory };
export { FormComponent };
export declare class FormWrapper extends React.Component<any, any> {
    constructor(props: any);
    render(): JSX.Element;
    addPage: () => void;
    addSection(pageNo: number, index: number, section: any): void;
    updateProps: () => void;
}
export declare function render(props: any, target: string): void;
