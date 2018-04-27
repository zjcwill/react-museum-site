import React from "react";
import { Card, Row, Col } from "antd";
import "./index.css";
import QueueAnim from "rc-queue-anim";

class InformationBoardCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: null
    };
  }
  componentDidMount() {
    this.setState({ number: this.props.from, to: this.props.to });
    this.timer = setInterval(() => this.grow(), 10);
  }
  componentWillMount() {
    clearInterval(this.timer);
  }
  grow() {
    if (this.state.number < this.state.to) {
      this.setState({ number: this.state.number + 1 });
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
    <QueueAnim delay={650}>
      <InformationBoardCard key={1} title="馆藏量" from={999900} to={1000000} />
      <InformationBoardCard
        key={2}
        title="访问人数"
        from={999900}
        to={1000000}
      />
      <InformationBoardCard key={3} title="阅读量" from={999900} to={1000000} />
      <InformationBoardCard
        key={4}
        title="人气值"
        from={999900}
        to={1000000}
      />
    </QueueAnim>
  </Row>
);

export default InformationBoard;
