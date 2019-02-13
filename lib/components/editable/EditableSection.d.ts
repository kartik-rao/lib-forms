import * as React from "react";
import { ISection, FormLayoutOptions } from "@adinfinity/ai-core-forms";
export interface SectionProps {
    section: ISection;
    formLayout: FormLayoutOptions;
    values: any;
    eventHooks: any;
    conditionals: any;
    errors: any;
    touched: any;
}
export declare class EditableSectionComponent extends React.Component<SectionProps, any> {
    state: any;
    props: SectionProps;
    constructor(props: SectionProps);
    onDragEnd(result: any): void;
    render(): JSX.Element;
}
