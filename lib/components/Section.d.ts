import * as React from "react";
import RootStore from "../models/RootStore";
export interface SectionProps {
    eventHooks: any;
    store: RootStore;
    pageIndex: number;
    sectionIndex: number;
}
export declare class SectionComponent extends React.Component<SectionProps, any> {
    state: any;
    props: SectionProps;
    constructor(props: SectionProps);
    render(): JSX.Element;
}
