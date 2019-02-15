import * as React from "react";
import { Logger } from "@adinfinity/ai-lib-logging";
export declare class FormComponent extends React.Component<any, any> {
    evaluators: any;
    values: any;
    touched: any;
    logger: Logger;
    getFieldValue(id: any): any;
    constructor(props: any);
    next(errors: any, setFieldError: any): void;
    prev(): void;
    onChange(id: string, value: any): void;
    onBlur(id: string): void;
    onSubmit: (values: any, actions: any) => void;
    validate: (values: any, includeFields?: any[]) => {};
    render(): JSX.Element;
}
export default FormComponent;
