import React from "react";
import { Card, Row, Col } from "antd";
import "./index.css";

class InformationBoardCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            number: props.number,
        }
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
    <InformationBoardCard title="馆藏量" number="1000000" />
    <InformationBoardCard title="访问人数" number="1000000" />
    <InformationBoardCard title="馆藏量" number="1000000" />
    <InformationBoardCard title="馆藏量" number="1000000" />
  </Row>
);

export default InformationBoard;

