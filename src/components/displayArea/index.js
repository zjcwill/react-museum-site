import React from 'react';
import { Row, Col, Card } from 'antd';
import './index.css';
import longPic from './img/qinming.png';
import LazyLoad from 'react-lazy-load';

const { Meta } = Card;

class DisplayArea extends React.Component {
    constructor() {
        super();
        this.state = {
            marginLeft: 0
        }
    }

    scrollImg(){        
        this.setState((preState)=>{
            const marginLeft = preState.marginLeft -1;
            console.log(marginLeft);
            return {marginLeft: marginLeft}
        });
    }

    componentDidMount(){
       
    }

    render() {
        return (
            <Row className="displayarea-container">
                <LazyLoad height="100%" width="100%">
                    <img src={longPic} />
                </LazyLoad>
            </Row>
        )
    }
}

export default DisplayArea;
