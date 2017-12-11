import React from 'react';
import { Layout } from 'antd';
import './index.css';
const { Footer } = Layout;

const FooterComponent = () => {
    return (
        <Footer>
            <div className="container">
                <span>© 2017 张嘉超 &nbsp;</span>
                <span>
                    <a href="https://zjcwll.top/">粤ICP备15111480号-1</a>
                </span>
            </div>
        </Footer>
    )
}

export default FooterComponent;