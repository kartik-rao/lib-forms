import * as React from "react";
export declare class FormComponent extends React.Component<any, any> {
    evaluators: any;
    validateForm: () => void;
    values: any;
    getFieldValue(id: any): any;
    constructor(props: any);
    next(): void;
    prev(): void;
    onChange(id: string, value: any): void;
    handleConfirmBlur: (e: any) => void;
    handleSubmit: (values: any) => void;
    render(): JSX.Element;
}
export default FormComponent;
