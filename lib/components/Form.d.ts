import * as React from "react";
export declare class FormComponent extends React.Component<any, any> {
    evaluators: any;
    constructor(props: any);
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
declare const _default: React.ComponentClass<import("antd/lib/form/Form").RcBaseFormProps & Pick<any, string | number | symbol>>;
export default _default;
