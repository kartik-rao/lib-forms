import { createFormStore, Factory, IFormProps, EmptyForm } from '@kartikrao/lib-forms-core';
import { Layout } from 'antd';
import React from 'react';
import { render } from 'react-dom';
import { EditorStoreProvider } from './store/EditorStoreProvider';
import {Canvas} from "./components/canvas/Canvas"
import {enableLogging} from 'mobx-logger';
enableLogging({action: true, compute: false});

export default async function renderForm(selector:string, initialState: any) {

    const formStore = createFormStore();
    formStore.setForm(Factory.makeForm(formStore, initialState));

    render(
        <Layout style={{height: '100vh', overflow: 'hidden'}}>
            <React.Suspense fallback="Loading...">
                <EditorStoreProvider formStore={formStore}>
                    <Canvas />
                </EditorStoreProvider>
            </React.Suspense>
        </Layout>, document.querySelector(selector)
    );
};

renderForm("#root", EmptyForm);