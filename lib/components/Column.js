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
import { Col } from "antd";
import { FieldComponent } from "./Field";
var ColumnComponent = /** @class */ (function (_super) {
    __extends(ColumnComponent, _super);
    function ColumnComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.props = props;
        return _this;
    }
    ColumnComponent.prototype.render = function () {
        var _a = this.props, column = _a.column, formLayout = _a.formLayout, span = _a.span, conditionals = _a.conditionals, decorators = _a.decorators, eventHooks = _a.eventHooks;
        return React.createElement(Col, { span: span }, column.fields.map(function (field, fn) {
            return React.createElement(FieldComponent, { field: field, key: fn, formLayout: formLayout, conditionals: conditionals, decorators: decorators, eventHooks: eventHooks });
        }));
    };
    return ColumnComponent;
}(React.Component));
export { ColumnComponent };
