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
import { SectionComponent } from "./Section";
import { Card } from "antd";
var PageComponent = /** @class */ (function (_super) {
    __extends(PageComponent, _super);
    function PageComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.props = props;
        return _this;
    }
    PageComponent.prototype.render = function () {
        var _a = this.props, page = _a.page, formLayout = _a.formLayout, index = _a.index, eventHooks = _a.eventHooks, decorators = _a.decorators, conditionals = _a.conditionals;
        return React.createElement("div", { className: "page-content" },
            React.createElement(Card, { title: formLayout.showPageTitles ? page.title : "" },
                React.createElement("div", { className: "page", key: index.toString() }, page.sections.map(function (section, sn) {
                    return React.createElement(SectionComponent, { section: section, key: sn, conditionals: conditionals, formLayout: formLayout, decorators: decorators, eventHooks: eventHooks });
                }))));
    };
    return PageComponent;
}(React.Component));
export { PageComponent };
