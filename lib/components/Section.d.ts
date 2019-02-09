import * as React from "react";
import { ISection, FormLayoutOptions } from "@adinfinity/ai-core-forms";
export interface SectionProps {
    section: ISection;
    formLayout: FormLayoutOptions;
    decorators: any;
    eventHooks: any;
    conditionals: any;
}
export declare class SectionComponent extends React.Component<SectionProps, any> {
    state: any;
    props: SectionProps;
    constructor(props: SectionProps);
    render(): JSX.Element;
}
