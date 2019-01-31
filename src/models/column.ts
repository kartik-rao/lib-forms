import {IField} from "./field";

export interface IColumn {
    id?: number;
    name?: string;
    title?: string;
    fields?: IField[]
}

export class Column implements IColumn {
    id: number;
    name: string;
    title: string;
    fields: IField[];

    constructor(id: number, name: string, title: string, fields: IField[]) {
        this.id = id;
        this.name = name || `column-${id}`;
        this.title = title || '';
        this.fields = fields || [];
    }
}