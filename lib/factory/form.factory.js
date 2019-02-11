import { FieldFactory } from "./field.factory";
import { valueOrDefault, Column } from "@adinfinity/ai-core-forms";
var FormFactory = /** @class */ (function () {
    function FormFactory() {
    }
    FormFactory.createForm = function (data) {
        var form = {};
        form.id = data.id;
        form.exid = data.exid;
        form.desc = data.desc;
        form.name = data.name;
        var flOptions = data.formLayoutOptions || {};
        form.formLayoutOptions = {
            wrapperSpan: valueOrDefault(flOptions.wrapperSpan, 20),
            wrapperOffset: valueOrDefault(flOptions.wrapperOffset, 2),
            showPageBorders: valueOrDefault(flOptions.showPageBorders, true),
            showSectionBorders: valueOrDefault(flOptions.showSectionBorders, true),
            showPageTitles: valueOrDefault(flOptions.showPageTitles, true),
            showSectionTitles: valueOrDefault(flOptions.showSectionTitles, true),
            showSteps: valueOrDefault(flOptions.showSteps, true),
            validationDisablesPaging: valueOrDefault(flOptions.validationDisablesPaging, true),
        };
        var tenant = {};
        if (data.tenant) {
            tenant.context = data.tenant.content;
            tenant.stack = data.tenant.content;
            tenant.eid = data.tenant.content;
            tenant.mid = data.tenant.content;
        }
        form.tenant = data.tenant;
        var status = {};
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
        var content = {};
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
        var pages = data.content.pages || [];
        pages.forEach(function (p, pn) {
            var page = {
                name: p.name,
                icon: p.icon,
                sections: [],
                type: p.type,
                title: p.title,
                subtitle: p.subtitle,
                wizard: p.wizard
            };
            p.sections.forEach(function (s, sn) {
                var section = { id: s.id, name: s.name, gutter: s.gutter, columns: [] };
                s.columns.forEach(function (col, itemno) {
                    var column = new Column(col.id, col.name, col.title, []);
                    col.fields.map(function (f, fn) {
                        var field = FieldFactory.createField(f);
                        column.fields.push(field);
                    });
                    section.columns.push(column);
                });
                page.sections.push(section);
            });
            content.pages.push(page);
        });
        form.content = content;
        return form;
    };
    return FormFactory;
}());
export { FormFactory };
