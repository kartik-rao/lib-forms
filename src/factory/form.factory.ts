import {FormTenant, IFormProps, FormStatus, FormContent} from "../models/form";
import {FieldFactory} from "./field.factory";
import {Column, IColumn} from "../models/column";
import { IField } from "../models/field";

let exists = (v: any) => {
    return (typeof v != 'undefined' && v != null)
}

let withDefault = (t: any, d: any) => {
    return (exists(t) ? t : d);
}

export class FormFactory {
    static createForm(data: any) : any {
        let form = <IFormProps>{};
        form.id = data.id;
        form.exid = data.exid;
        form.desc = data.desc;
        form.name = data.name;

        form.formLayoutOptions = {
            wrapperSpan: withDefault(data.formLayoutOptions.wrapperSpan, 20),
            wrapperOffset: withDefault(data.formLayoutOptions.wrapperOffset, 2),
            showPageBorders : withDefault(data.formLayoutOptions.showPageBorders, true),
            showSectionBorders : withDefault(data.formLayoutOptions.showSectionBorders, true),
            showPageTitles : withDefault(data.formLayoutOptions.showPageTitles, true),
            showSectionTitles:withDefault(data.formLayoutOptions.showSectionTitles, true),
            showSteps:withDefault(data.formLayoutOptions.showSteps, true),
            validationDisablesPaging: withDefault(data.formLayoutOptions.validationDisablesPaging, true),
        };

        let tenant = <FormTenant>{};
        if(data.tenant) {
            tenant.context = data.tenant.content;
            tenant.stack = data.tenant.content;
            tenant.eid = data.tenant.content;
            tenant.mid = data.tenant.content;
        }
        form.tenant = data.tenant;

        let status = <FormStatus>{};
        if (data.status) {
            status.timezone = data.status.timezone;
            status.paused = data.status.paused;
            status.active = data.status.active;
            status.created = data.status.created;
            status.edited = data.status.edited;
            status.starts = data.status.starts;
            status.ends = data.status.ends;
        }

        form.status = status;
        let content = <FormContent>{};
        content.title = data.content.title;
        content.subtitle = data.content.subtitle;
        content.labels = data.content.labels;
        content.offset = data.content.offset;
        content.width = data.content.width;
        content.sidebar = data.content.sidebar;
        content.scripts = data.content.scripts;
        content.styles = data.content.styles;
        content.datasets = data.content.datasets;

        content.paginate = data.content.paginate;
        content.validationDisablesPaging = data.content.validationDisablesPaging;
        content.css = data.content.css;
        content.header = data.content.header;
        content.footer = data.content.footer;
        content.trackingPixels = data.content.trackingPixels;

        let fieldState = {};
        content.pages = [];
        content.allFields = [];
        content.fieldLocation = {};
        content.dependencyMap = {}
        let conditionAncestors = {};
        data.content.pages.forEach((p: any, pn: number) => {
            let page = {
                name : p.name,
                icon : p.icon,
                sections: [],
                type : p.type,
                title : p.title,
                subtitle : p.subtitle,
                wizard : p.wizard,
                fieldNames: []
            };
            p.sections.forEach((s: any, sn: number) => {
                let section = { id: s.id, name: s.name, gutter: s.gutter, columns: [] };
                s.columns.forEach((col: IColumn, itemno: number) => {
                    let column: Column = new Column(col.id, col.name, col.title, []);
                    col.fields.map((f: IField, fn: number) => {
                        let field = FieldFactory.createField(f);
                        field.location = {page: pn, section: sn, column: itemno, field: fn}
                        conditionAncestors[field.id] = field.condition.ancestors;
                        column.fields.push(field);
                        content.allFields.push(field);
                        content.fieldLocation[field.id] = field.location;
                        page.fieldNames.push(field.name);
                    });
                    section.columns.push(column);
                });
                page.sections.push(section);
            });
            content.pages.push(page);
        });

        Object.keys(conditionAncestors).forEach((f) => {
            let ancestors = conditionAncestors[f];
            ancestors.forEach((a) => {
                content.dependencyMap[a] = content.dependencyMap[a] ? content.dependencyMap[a] : [];
                content.dependencyMap[a].push(f);
            });
        });

        form.content = content;
        return form;
    }
}