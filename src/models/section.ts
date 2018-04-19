import {IField} from "./field";

export interface ISection {
    id?: number;
    name?: string;
    fields?: IField[]
}

export class Section implements ISection {
    id: number;
    name: string;
    title: string;
    fields: IField[];

    constructor(id: number, name: string, title: string, fields: IField[]) {
        this.id = id;
        this.name = name || `section-${id}`;
        this.title = title || '';
        this.fields = fields || [];
    }
}