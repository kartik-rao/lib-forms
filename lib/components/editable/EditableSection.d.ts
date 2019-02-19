import * as React from "react";
import RootStore from "../../models/RootStore";
export interface SectionProps {
    eventHooks: any;
    store: RootStore;
    pageIndex: number;
    sectionIndex: number;
}
export declare class EditableSectionComponent extends React.Component<SectionProps, any> {
    state: any;
    props: SectionProps;
    constructor(props: SectionProps);
    onDragEnd(result: any): void;
    render(): JSX.Element;
}
