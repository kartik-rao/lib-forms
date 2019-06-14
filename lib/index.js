import React from 'react';
import { render } from 'react-dom';
import { Canvas } from './components/canvas/Canvas';
import RootStore from './store/RootStore';
import { Layout } from 'antd';
export function renderForm(selector, initialState) {
    let store = new RootStore(initialState);
    render(React.createElement(Layout, { style: { height: '100vh', overflow: 'hidden' } },
        React.createElement(Canvas, { store: store })), document.querySelector(selector));
}
;
