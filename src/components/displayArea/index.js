import React from 'react';
import { Row, Col, Card } from 'antd';
import './index.css';

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

const DisplayArea = () => (
    <Row className="displayarea-container">
      
    </Row>
);

export default DisplayArea;
