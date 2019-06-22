import { Section } from "@kartikrao/lib-forms-core";
import * as React from "react";
import { RootStore } from "../../../store/RootStore";
export interface ISectionItemProps {
    sec: Section;
    key: string;
    index: number;
    store: RootStore;
}
export declare class SectionItem extends React.Component<ISectionItemProps, any> {
    render(): JSX.Element;
}
