import * as React from "react";
import { SectionComponent } from "./Section";
import { Card } from "antd";
export class PageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        let { page, formLayout, index, eventHooks, decorators, conditionals } = this.props;
        return React.createElement("div", { className: "page-content" },
            React.createElement(Card, { title: formLayout.showPageTitles ? page.title : "" },
                React.createElement("div", { className: "page", key: index.toString() }, page.sections.map((section, sn) => {
                    return React.createElement(SectionComponent, { section: section, key: sn, conditionals: conditionals, formLayout: formLayout, decorators: decorators, eventHooks: eventHooks });
                }))));
    }
}
