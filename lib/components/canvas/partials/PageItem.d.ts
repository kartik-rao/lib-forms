import { Page } from "@kartikrao/lib-forms-core";
import * as React from "react";
export interface IPageItemProps {
    page: Page;
    key: string;
    index: number;
}
export declare const PageItem: React.FC<IPageItemProps>;
