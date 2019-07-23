import { Section } from "@kartikrao/lib-forms-core";
import * as React from "react";
import { EditorStore } from "../../../store/EditorStore";
export interface ISectionItemProps {
    sec: Section;
    key: string;
    index: number;
    store: EditorStore;
}
export declare class SectionItem extends React.Component<ISectionItemProps, any> {
    render(): JSX.Element;
}
