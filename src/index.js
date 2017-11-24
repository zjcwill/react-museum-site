import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Router from './routes/main';

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
