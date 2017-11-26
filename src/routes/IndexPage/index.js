import React from 'react';
import { actions, connect } from 'mirrorx';
import { Carousel } from 'antd';
import Banner from '../../components/banner';
import './container';
import './index.css';

const IndexPage = connect(state => { return { data: state.IndexPage } })(props => (
    <div>
        <Banner imgUrl={props.data.bannerURL}/>
        <div style={{ height: "100px" }}>
            <h3>公告栏</h3>
        </div>
        <div style={{ height: "300px", backgroundColor: "green" }}>
            <h3>特色模块展示</h3>
        </div>
    </div>
)
);

export default IndexPage;