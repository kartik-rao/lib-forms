import * as React from "react";
export declare class FormComponent extends React.Component<any, any> {
    evaluators: any;
    validateForm: () => void;
    values: any;
    getFieldValue(id: any): any;
    constructor(props: any);
    next(errors: any, touched: any, values: any, validationSchema: any): void;
    prev(): void;
    onChange(id: string, value: any): void;
    onSubmit: (values: any, actions: any) => void;
    render(): JSX.Element;
}
export default FormComponent;
