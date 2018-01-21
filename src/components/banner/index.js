/**
 * 轮播图组件
 */
import React from 'react';
import { Carousel } from 'antd';
import "./index.css"

const BannerComponent = (props) => {
    return (
        <div>
            <Carousel autoplay> 
                <div><img alt="banner" src={props.imgUrl[0]}></img></div>
                <div><img alt="banner" src={props.imgUrl[1]}></img></div>
                <div><img alt="banner" src={props.imgUrl[2]}></img></div>
                <div><img alt="banner" src={props.imgUrl[3]}></img></div>
            </Carousel>
        </div>

    )
}

export default BannerComponent;