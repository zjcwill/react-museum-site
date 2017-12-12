import React from 'react';
import { Link } from 'mirrorx';
import { Layout, Menu } from 'antd';
import './index.css';

const { Header } = Layout;

const HeaderComponent = () => {
    return (
        <Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="index">
                    <Link to="/">主页</Link>
                </Menu.Item>
                <Menu.Item key="news">
                    <Link to="/news">资讯</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/topics">全景漫游</Link>
                </Menu.Item>
            </Menu>
        </Header>
    )
}

export default HeaderComponent;