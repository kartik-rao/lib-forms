import { __awaiter } from "tslib";
import { createFormStore, Factory, EmptyForm } from '@kartikrao/lib-forms-core';
import { Layout } from 'antd';
import React from 'react';
import { render } from 'react-dom';
import { EditorStoreProvider } from './store/EditorStoreProvider';
import { Canvas } from "./components/canvas/Canvas";
import { enableLogging } from 'mobx-logger';
enableLogging({ action: true, compute: false });
// Should EditorStoreProvider be instantiated here ?
export default function renderForm(selector, initialState) {
    return __awaiter(this, void 0, void 0, function* () {
        const formStore = createFormStore();
        formStore.setForm(Factory.makeForm(formStore, initialState));
        render(React.createElement(Layout, { style: { height: '100vh', overflow: 'hidden' } },
            React.createElement(React.Suspense, { fallback: "Loading..." },
                React.createElement(EditorStoreProvider, { formStore: formStore },
                    React.createElement(Canvas, null)))), document.querySelector(selector));
    });
}
;
renderForm("#root", EmptyForm);
