import React from 'react';
import mirror, { actions, connect } from 'mirrorx';
import { Carousel } from 'antd';
import './container';
import './index.css';

const IndexPage = connect(state => { return { data: state.IndexPage } })
    (props =>
        (
            <div>
                <Carousel autoplay>
                    <div><img src={props.data.bannerURL[0]}></img></div>
                    <div><img src={props.data.bannerURL[0]}></img></div>
                    <div><img src={props.data.bannerURL[0]}></img></div>
                    <div><img src={props.data.bannerURL[0]}></img></div>
                </Carousel>
                <div style={{height:"100px"}}>
                    <h3>公告栏</h3>
                </div>
                <div style={{height:"300px",backgroundColor:"green"}}>
                    <h3>特色模块展示</h3>
                </div>
            </div>
        )
    );

export default IndexPage;