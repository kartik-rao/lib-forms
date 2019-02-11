var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from "react";
import { Card, Row } from "antd";
import { ColumnComponent } from "./Column";
var SectionComponent = /** @class */ (function (_super) {
    __extends(SectionComponent, _super);
    function SectionComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.props = props;
        return _this;
    }
    SectionComponent.prototype.render = function () {
        var _a = this.props, section = _a.section, formLayout = _a.formLayout, conditionals = _a.conditionals, decorators = _a.decorators, eventHooks = _a.eventHooks;
        var showSectionTitles = formLayout.showSectionTitles, showSectionBorders = formLayout.showSectionBorders;
        var numColumns = section.columns.length;
        return React.createElement(Card, { bordered: showSectionBorders, title: showSectionTitles ? section.name : "" },
            React.createElement(Row, { gutter: 16 }, section.columns.map(function (column, fn) {
                return React.createElement(ColumnComponent, { formLayout: formLayout, key: fn, column: column, span: 24 / numColumns, conditionals: conditionals, decorators: decorators, eventHooks: eventHooks });
            })));
    };
    return SectionComponent;
}(React.Component));
export { SectionComponent };
