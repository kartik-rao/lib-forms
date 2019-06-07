import { IFormProps } from '@kartikrao/lib-forms-core';
import React from 'react';
import { render } from 'react-dom';
import { FormWrapper } from './components/FormWrapper';
import RootStore from './models/RootStore';
import { FormView } from "@kartikrao/lib-forms-core/lib/views/FormView";
import { Layout, Row, Col } from 'antd';
import {ComponentTree} from './components/editable/ComponentTree';
export { FormWrapper };

export function renderForm(selector:string, initialState: IFormProps) {
    let store = new RootStore(initialState);
    render(
        <Layout style={{ height: "100vh" }} >
            <Row><br /></Row>
            <Row>
                <Col span={6}>
                    <ComponentTree store={store.formStore} />
                </Col>
                <Col span={18}>
                    <FormView store={store.formStore} />
                </Col>
            </Row>
        </Layout>, document.querySelector(selector)
    );
};