import { Section } from "@kartikrao/lib-forms-core";
import * as React from "react";
export interface ISectionItemProps {
    sec: Section;
    key: string;
    index: number;
    pageIndex: number;
}
export declare const SectionItem: React.FC<ISectionItemProps>;
