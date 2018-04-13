import {Section} from "./model.section";

export interface Page {
    name?: string;
    icon?: string;
    sections?: Section[];
    type?: string;
    title?: string;
    subtitle?: string;
    wizard?: boolean;
}