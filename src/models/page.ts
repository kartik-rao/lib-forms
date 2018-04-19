import {ISection} from "./section";

export interface IPage {
    name?: string;
    icon?: string;
    sections?: ISection[];
    type?: string;
    title?: string;
    subtitle?: string;
    wizard?: boolean;
}

export class Page implements IPage {
    name: string;
    icon: string;
    sections: ISection[];
    title: string;
    subtitle: string;

    constructor (name: string, icon: string, sections: ISection[], title: string, subtitle: string) {
        this.name = name || "";
        this.icon = icon || "";
        this.sections = sections || <ISection[]>[];
        this.title = title;
        this.subtitle = subtitle;
    }
}