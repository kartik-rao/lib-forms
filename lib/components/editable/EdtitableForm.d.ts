import * as React from "react";
export declare class FormComponent extends React.Component<any, any> {
    evaluators: any;
    values: any;
    touched: any;
    getFieldValue(id: any): any;
    constructor(props: any);
    next(errors: any, touched: any): void;
    prev(): void;
    onChange(id: string, value: any): void;
    onBlur(id: string): void;
    onSubmit: (values: any, actions: any) => void;
    validate: (values: any) => {};
    render(): JSX.Element;
}
export default FormComponent;
