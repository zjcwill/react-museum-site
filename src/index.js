import React from 'react';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './routes';
import { render, Router } from 'mirrorx';

render(
    <Router hashType="hashbang">
        <App />
    </Router>, document.getElementById('root'));
registerServiceWorker();
