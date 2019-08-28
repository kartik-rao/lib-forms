import { IFormProps, createFormStore } from '@kartikrao/lib-forms-core';
import React from 'react';
import { render } from 'react-dom';
import { Canvas } from './components/canvas/Canvas';
import {createEditorStore} from "./store/EditorStore";
import {EditorStoreProvider} from './store/EditorStoreProvider';
import { Layout } from 'antd';

export function renderForm(selector:string, initialState: IFormProps) {
    const formStore = createFormStore(initialState);
    render(
        <Layout style={{height: '100vh', overflow: 'hidden'}}>
            <EditorStoreProvider formStore={formStore}>
                <Canvas />
            </EditorStoreProvider>
        </Layout>, document.querySelector(selector)
    );
};