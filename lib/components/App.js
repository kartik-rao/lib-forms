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
import 'airbnb-browser-shims';
import { Row, Col, Layout } from "antd";
import { FormFactory } from "../factory/form.factory";
import FormComponent from "./Form";
export { FormFactory };
export { FormComponent };
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { formData: FormFactory.createForm(_this.props.formData) };
        return _this;
    }
    App.prototype.render = function () {
        var formData = this.state.formData;
        return (React.createElement(Layout, { style: { height: "100vh" } },
            React.createElement(Row, null,
                React.createElement("br", null)),
            React.createElement(Row, { justify: "space-around" },
                React.createElement(Col, { span: formData.formLayoutOptions.wrapperSpan, offset: formData.formLayoutOptions.wrapperOffset },
                    React.createElement(FormComponent, { formData: formData }))),
            React.createElement(Row, null)));
    };
    return App;
}(React.Component));
export default App;
