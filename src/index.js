import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import { LocaleProvider } from 'antd';

import promise from 'redux-promise';
import multi from 'redux-multi';
import thunk from 'redux-thunk';

import App from './main/App';
import reducers from './main/reducers';

import ptBR from 'antd/lib/locale-provider/pt_BR';
import 'moment/locale/pt-br';

import './index.css';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
        && window.__REDUX_DEVTOOLS_EXTENSION__();
//const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools);
const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools);
const WrapperApp = props => (
    <Provider store={store}>
        <LocaleProvider locale={ptBR}>
            <App />
        </LocaleProvider>
    </Provider>
);

ReactDOM.render(
    <WrapperApp />
, document.getElementById('root'));