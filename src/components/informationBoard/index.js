import React from "react";
import { Card, Row, Col } from "antd";
import "./index.css";
import QueueAnim from "rc-queue-anim";

class InformationBoardCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: props.number
    };
  }

  render() {
    return (
      <Col span={6}>
        <Card className="informationboard-card">
          <Row>
            <Col>
              <span className="title">{this.props.title}</span>
            </Col>
            <Col>
              <span className="number">{this.state.number}</span>
            </Col>
          </Row>
        </Card>
      </Col>
    );
  }
}

const InformationBoard = () => (
  <Row className="informationboard-container">
    <QueueAnim delay={500}>
      <InformationBoardCard key={1} title="馆藏量" number="1000000" />
      <InformationBoardCard key={2} title="访问人数" number="1000000" />
      <InformationBoardCard key={3} title="阅读量" number="1000000" />
      <InformationBoardCard key={4} title="人气值" number="1000000" />
    </QueueAnim>
  </Row>
);

export default InformationBoard;
