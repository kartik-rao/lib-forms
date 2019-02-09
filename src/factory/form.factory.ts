import {FieldFactory} from "./field.factory";
import {valueOrDefault, FormTenant, IFormProps, FormStatus, FormContent, Column, IColumn, IField} from "@adinfinity/ai-core-forms";
import IForm from "@adinfinity/ai-core-forms";
export class FormFactory {
    static createForm(data: any) : IFormProps {
        let form = <IFormProps>{};
        form.id = data.id;
        form.exid = data.exid;
        form.desc = data.desc;
        form.name = data.name;

        let flOptions = data.formLayoutOptions || {}
        form.formLayoutOptions = {
            wrapperSpan: valueOrDefault(flOptions.wrapperSpan, 20),
            wrapperOffset: valueOrDefault(flOptions.wrapperOffset, 2),
            showPageBorders : valueOrDefault(flOptions.showPageBorders, true),
            showSectionBorders : valueOrDefault(flOptions.showSectionBorders, true),
            showPageTitles : valueOrDefault(flOptions.showPageTitles, true),
            showSectionTitles:valueOrDefault(flOptions.showSectionTitles, true),
            showSteps:valueOrDefault(flOptions.showSteps, true),
            validationDisablesPaging: valueOrDefault(flOptions.validationDisablesPaging, true),
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

        let pages = data.content.pages || [];

        pages.forEach((p: any, pn: number) => {
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