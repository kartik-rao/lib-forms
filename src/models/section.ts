import {IColumn} from "./column";

export interface ISection {
    id?: number;
    name?: string;
    gutter?:number;
    columns?: IColumn[]
}

export class Section implements ISection {
    id: number;
    name: string;
    title: string;
    gutter: number;
    columns: IColumn[];

    constructor(id: number, name: string, title: string, gutter:number=0, columns: IColumn[]) {
        this.id = id;
        this.name = name || `section-${id}`;
        this.title = title || '';
        this.gutter = gutter;
        this.columns = columns || [];
    }
}