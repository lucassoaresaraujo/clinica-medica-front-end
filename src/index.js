import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './main/App';
import { LocaleProvider } from 'antd';
import ptBR from 'antd/lib/locale-provider/pt_BR';
import 'moment/locale/pt-br';

const WrapperApp = props => (
    <LocaleProvider locale={ptBR}>
        <App />
    </LocaleProvider>
);

ReactDOM.render(
    <WrapperApp />
, document.getElementById('root'));