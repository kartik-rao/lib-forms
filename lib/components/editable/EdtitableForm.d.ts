import * as React from "react";
import { Logger } from "@kartikrao/lib-logging";
import RootStore from "../../models/RootStore";
interface FormComponentProps {
    store: RootStore;
}
export declare class FormComponent extends React.Component<FormComponentProps, any> {
    logger: Logger;
    setFieldError: any;
    constructor(props: any);
    render(): JSX.Element;
}
export default FormComponent;
