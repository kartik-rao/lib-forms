import * as React from "react";
import { Button, Card, Row, Col} from "antd";
import {FormStateHelper} from "../../helpers/FormStateHelper";
import {Logger} from "@adinfinity/ai-lib-logging";

const logger: Logger = Logger.getInstance(["ai-lib-forms", "FieldProperties"], Logger.severity.debug);

export class FieldPropertiesComponent extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
    }

    render() {
        return (<Card></Card>)
    }
}