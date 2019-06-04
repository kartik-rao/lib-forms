import * as React from "react";
import { FormComponentProps } from "antd/lib/form/Form";
import RootStore from "../models/RootStore";
export interface IFormComponentProps extends FormComponentProps {
    store: RootStore;
}
declare class FormComponent extends React.Component<IFormComponentProps, any> {
    evaluators: any;
    props: IFormComponentProps;
    constructor(props: IFormComponentProps);
    next(): void;
    prev(): void;
    onChange(id: string): void;
    handleConfirmBlur: (e: any) => void;
    handleSubmit: (e: React.FormEvent<any>) => void;
    eventHooks: (fieldId: string) => {
        onChange: any;
        onBlur: any;
    };
    render(): JSX.Element;
}
declare const _default: import("antd/lib/form/interface").ConnectedComponentClass<typeof FormComponent, Pick<IFormComponentProps, "store" | "wrappedComponentRef">>;
export default _default;
