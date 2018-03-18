import React from 'react';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './routes';
import mirror,{ render, Router } from 'mirrorx';

//开启url哈希，防止缓存
mirror.defaults({
    historyMode:'hash'
});

render(
    <Router>
        <App />
    </Router>, document.getElementById('root'));
registerServiceWorker();
