import * as React from "react";
import {Page} from "../models/model.page";
import {Section} from "../models/model.section";

import {SectionComponent} from "./component.section";

export class PageComponent extends React.Component<Page, any> {
    constructor(props: Page) {
        super(props);
    }

    render() {
        return (
            <div data-name={this.props.name} data-type={this.props.type} className="af-page">
                {this.props.sections.map((s: Section, si)=> {
                    return <SectionComponent key={si} {...s}/>
                })}
            </div>
        )
    }
}