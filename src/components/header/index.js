import React from 'react';
import { NavLink } from 'mirrorx';
import { Layout, Menu, Icon } from 'antd';
import './index.css';

const { Header } = Layout;

const HeaderComponent = ({ location }) => {
    console.log(location.pathname)
    return (
        <Header>
            <div className="logo" />
            <Menu
                theme="light"
                mode="horizontal"
                selectedKeys={[location.pathname]}
                defaultSelectedKeys={["/"]}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="/">
                    <NavLink to="/"><Icon type="home" />主页</NavLink>
                </Menu.Item>
                <Menu.Item key="/news">
                    <NavLink to="/news"><Icon type="info-circle-o" />资讯</NavLink>
                </Menu.Item>
                <Menu.Item key="/viewerIndex">
                    <NavLink to="/viewerIndex"><Icon type="global" />全景漫游</NavLink>
                </Menu.Item>
            </Menu>
        </Header>
    )
}

export default HeaderComponent;