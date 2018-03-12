import React from 'react';
import { Row, Col, Card } from 'antd';
import './index.css';
import longPic from './img/qinming.png';
const { Meta } = Card;

const DisplayCard = () => (
    <Col>
        <Card
            hoverable
            className="displayarea-card"
            cover={<img alt="example" src="http://via.placeholder.com/200x200" />}
        >
            <Meta
                title="Europe Street beat"
            />
        </Card>
    </Col>
);


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
                <img src={longPic} />
            </Row>
        )
    }
}

export default DisplayArea;
