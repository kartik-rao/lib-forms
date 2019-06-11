import { IFormProps } from '@kartikrao/lib-forms-core';
import React from 'react';
import { render } from 'react-dom';
import { Canvas } from './components/editable/Canvas';
import RootStore from './models/RootStore';
import { Layout } from 'antd';

export function renderForm(selector:string, initialState: IFormProps) {
    let store = new RootStore(initialState);
    render(
        <Layout style={{height: '100vh', overflow: 'hidden'}}><Canvas store={store}/></Layout>, document.querySelector(selector)
    );
};