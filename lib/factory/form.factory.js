"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var field_factory_1 = require("./field.factory");
var ai_core_forms_1 = require("@adinfinity/ai-core-forms");
var FormFactory = /** @class */ (function () {
    function FormFactory() {
    }
    FormFactory.createForm = function (data) {
        var form = {};
        form.id = data.id;
        form.exid = data.exid;
        form.desc = data.desc;
        form.name = data.name;
        form.formLayoutOptions = {
            wrapperSpan: ai_core_forms_1.valueOrDefault(data.formLayoutOptions.wrapperSpan, 20),
            wrapperOffset: ai_core_forms_1.valueOrDefault(data.formLayoutOptions.wrapperOffset, 2),
            showPageBorders: ai_core_forms_1.valueOrDefault(data.formLayoutOptions.showPageBorders, true),
            showSectionBorders: ai_core_forms_1.valueOrDefault(data.formLayoutOptions.showSectionBorders, true),
            showPageTitles: ai_core_forms_1.valueOrDefault(data.formLayoutOptions.showPageTitles, true),
            showSectionTitles: ai_core_forms_1.valueOrDefault(data.formLayoutOptions.showSectionTitles, true),
            showSteps: ai_core_forms_1.valueOrDefault(data.formLayoutOptions.showSteps, true),
            validationDisablesPaging: ai_core_forms_1.valueOrDefault(data.formLayoutOptions.validationDisablesPaging, true),
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
        content.validationDisablesPaging = data.content.validationDisablesPaging;
        content.css = data.content.css;
        content.header = data.content.header;
        content.footer = data.content.footer;
        content.trackingPixels = data.content.trackingPixels;
        var fieldState = {};
        content.pages = [];
        content.allFields = [];
        content.fieldLocation = {};
        content.dependencyMap = {};
        var conditionAncestors = {};
        data.content.pages.forEach(function (p, pn) {
            var page = {
                name: p.name,
                icon: p.icon,
                sections: [],
                type: p.type,
                title: p.title,
                subtitle: p.subtitle,
                wizard: p.wizard,
                fieldNames: []
            };
            p.sections.forEach(function (s, sn) {
                var section = { id: s.id, name: s.name, gutter: s.gutter, columns: [] };
                s.columns.forEach(function (col, itemno) {
                    var column = new ai_core_forms_1.Column(col.id, col.name, col.title, []);
                    col.fields.map(function (f, fn) {
                        var field = field_factory_1.FieldFactory.createField(f);
                        field.location = { page: pn, section: sn, column: itemno, field: fn };
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
        Object.keys(conditionAncestors).forEach(function (f) {
            var ancestors = conditionAncestors[f];
            ancestors.forEach(function (a) {
                content.dependencyMap[a] = content.dependencyMap[a] ? content.dependencyMap[a] : [];
                content.dependencyMap[a].push(f);
            });
        });
        form.content = content;
        return form;
    };
    return FormFactory;
}());
exports.FormFactory = FormFactory;
