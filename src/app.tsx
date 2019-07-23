import { IFormProps } from '@kartikrao/lib-forms-core';
import React from 'react';
import { render } from 'react-dom';
import { Canvas } from './components/canvas/Canvas';
import {EditorStore} from './store/EditorStore';
import { Layout } from 'antd';

export function renderForm(selector:string, initialState: IFormProps) {
    let store = new EditorStore(initialState);
    render(
        <Layout style={{height: '100vh', overflow: 'hidden'}}><Canvas store={store}/></Layout>, document.querySelector(selector)
    );
};