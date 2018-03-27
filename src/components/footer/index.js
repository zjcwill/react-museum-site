import React from 'react';
import { Layout } from 'antd';
import './index.css';
const { Footer } = Layout;

const FooterComponent = () => {
    return (
        <Footer>
            <div className="container">
                <span>© 2018 张嘉超 &nbsp;</span>
            </div>
        </Footer>
    )
}

export default FooterComponent;