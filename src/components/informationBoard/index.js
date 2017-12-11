import React from 'react';
import { Card, Row, Col } from 'antd';
import './index.css';

const InformationBoard = () => (
    <Row className="informationboard-container">
        <Col span={6}>
                <Card className="informationboard-card">
                    hello world
                </Card>
        </Col>
        <Col span={6}>
                <Card className="informationboard-card">
                    hello world
                </Card>
        </Col>
        <Col span={6}>
                <Card className="informationboard-card">
                    hello world
                </Card>
        </Col>
        <Col span={6}>
                <Card className="informationboard-card">
                    hello world
                </Card>
        </Col>
    </Row>
)

export default InformationBoard;