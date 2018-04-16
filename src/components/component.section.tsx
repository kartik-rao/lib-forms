import * as React from "react";
import {Section} from "../models/model.section";
import {Field} from "../models/model.field";

export class SectionComponent extends React.Component<Section, any> {
    constructor(props: Section) {
        super(props);
    }

    render() {
        return (
            <section id={this.props.id} data-name={this.props.name} className="af-section">
                {this.props.fields.map((f: Field, fi)=> {

                })}
            </section>
        )
    }
}