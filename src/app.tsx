import { createFormStore, Factory, IFormProps, EmptyForm } from '@kartikrao/lib-forms-core';
import { Layout, notification, Menu, Icon } from 'antd';
import React from 'react';
import { render } from 'react-dom';
import { EditorStoreProvider } from './store/EditorStoreProvider';
import {Canvas} from "./components/canvas/Canvas"
import {enableLogging} from 'mobx-logger';
enableLogging({action: false, compute: false});
import TestForm from "@kartikrao/lib-forms-core/lib/test-form";

import "./forms.editors.m.css";

export default async function renderForm(selector:string, initialState: any) {

    const formStore = createFormStore();
    formStore.setForm(Factory.makeForm(formStore, initialState));

    let onSave = (data: any) => {
        notification.info({message: "Saved!!"});
        console.log(data);
    }

    render(
        <Layout style={{height: '100vh', overflow: 'hidden'}}>
            <React.Suspense fallback="Loading...">
                <EditorStoreProvider formStore={formStore}>
                    <Canvas onSave={onSave}/>
                </EditorStoreProvider>
            </React.Suspense>
        </Layout>, document.querySelector(selector)
    );
};

renderForm("#root", TestForm);