import { valueOrDefault } from "@kartikrao/lib-forms-core";
import Column from "@kartikrao/lib-forms-core/lib/models/column";
import Field from "@kartikrao/lib-forms-core/lib/models/field";
import Form from "@kartikrao/lib-forms-core/lib/models/form";
import Page from "@kartikrao/lib-forms-core/lib/models/page";
import Section from "@kartikrao/lib-forms-core/lib/models/section";
export class FormFactory {
    static createForm(data, store) {
        let _form = {};
        _form.id = data.id;
        _form.exid = data.exid;
        _form.desc = data.desc;
        _form.name = data.name;
        let flOptions = data.formLayoutOptions || {};
        _form.formLayoutOptions = {
            wrapperSpan: valueOrDefault(flOptions.wrapperSpan, 20),
            wrapperOffset: valueOrDefault(flOptions.wrapperOffset, 2),
            showPageBorders: valueOrDefault(flOptions.showPageBorders, true),
            showSectionBorders: valueOrDefault(flOptions.showSectionBorders, true),
            showPageTitles: valueOrDefault(flOptions.showPageTitles, true),
            showSectionTitles: valueOrDefault(flOptions.showSectionTitles, true),
            showSteps: valueOrDefault(flOptions.showSteps, true),
            validationDisablesPaging: valueOrDefault(flOptions.validationDisablesPaging, true),
        };
        let tenant = {};
        if (data.tenant) {
            tenant.context = data.tenant.context;
            tenant.stack = data.tenant.stack;
            tenant.eid = data.tenant.eid;
            tenant.mid = data.tenant.mid;
        }
        _form.tenant = data.tenant;
        let status = {};
        if (data.status) {
            status.timezone = data.status.timezone;
            status.paused = data.status.paused;
            status.active = data.status.active;
            status.created = data.status.created;
            status.edited = data.status.edited;
            status.starts = data.status.starts;
            status.ends = data.status.ends;
        }
        _form.status = status;
        let content = {};
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
        content.css = data.content.css;
        content.header = data.content.header;
        content.footer = data.content.footer;
        content.trackingPixels = data.content.trackingPixels;
        content.pages = [];
        let pages = data.content.pages || [];
        let { formStore } = store;
        pages.forEach((p, pn) => {
            let page = new Page(p, formStore);
            p.sections.forEach((s, sn) => {
                let section = new Section(s, formStore);
                s.columns.forEach((col, itemno) => {
                    let column = new Column(col, formStore);
                    col.fields.map((f, fn) => {
                        let field = new Field(f, formStore);
                        column.fields.push(field);
                    });
                    section.columns.push(column);
                });
                page.sections.push(section);
            });
            content.pages.push(page);
        });
        _form.content = content;
        let form = new Form(_form, formStore);
        formStore.setForm(form);
        return form;
    }
}
