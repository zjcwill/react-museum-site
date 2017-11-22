import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Router from './routes/main';

// const Index = (props) => (
//     <div>
//         <header>header</header>
//         <div className="main">
//             {props.children}
//         </div>
//         <footer>footer</footer>
//     </div>
// )


// const Hello = () => (
//     <div>
//         <h1>我是首页</h1>
//         <Link to="/demo">demo</Link>
//     </div>
// )

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
