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
                {props.data.hello}
            </div>
        )
    );

export default IndexPage;