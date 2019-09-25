import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import Routes from './Routes';
import { store } from './store';
import '@babel/polyfill';

hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <div>{ renderRoutes(Routes) }</div>
        </BrowserRouter>
    </Provider>,
     document.getElementById('root')
);
