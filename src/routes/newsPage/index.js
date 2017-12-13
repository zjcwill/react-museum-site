import React from 'react';
import mirror, { actions, connect } from 'mirrorx';
import axios from 'axios';
import { Row, Col, Card } from 'antd';
import './index.css';

mirror.model({
  name: 'news',
  initialState: 0,
  reducers: {
    increment(state) { return state + 1 },
    decrement(state) { return state - 1 }
  },
  effects: {

    async incrementAsync() {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      actions.app.increment()
    }
  },
})

// connect state with component
const App = connect()(props => (
  <div>
    {console.log(props)}
    <h1>{props.count}</h1>
    {/* dispatch the actions */}
    <button onClick={() => actions.app.decrement()}>-</button>
    <button onClick={() => actions.app.increment()}>+</button>
    {/* dispatch the async action */}
    <button onClick={() => actions.app.incrementAsync()}>+ Async</button>
  </div>
)
)

//馆内公告
const MuseumNews = (props) => {
  return (<div>
    <BoradInformation />
  </div>)
}

//公告栏&重要活动（占位图）
const BoradInformation = (props) => {
  return (
    <Row style={{paddingTop:'20px'}}>
      <Col span={8} >
        <Card title="公告栏" style={{ width: '100%',maxHeight:'200px' }} loading={false} className="news-card-item">
          <p>我馆周一闭馆。观众参观可提前短信预约、网上预约或现场领票，团体参观需提前电话预约，详见参观门票。</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Col>
      <Col span={16} style={{paddingLeft:'30px'}}>
        <img src="http://via.placeholder.com/800x200" />
      </Col>
    </Row>
  )
}
// 博物馆快讯
const MuseumQuickInfo = (props) => {
  return (
    <div>
      博物馆快讯
    </div>
  )
}

//互联网新闻系统
const InternentNews = (props) => {
  return (
    <div>
      互联网新闻
      {props.hello}
    </div>
  )
}

//友链接模块
const FriendLink = () => {
  return (
    <div>
      友链
    </div>
  )
}

class NewsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //   const data = axios({
    //     url : "http://toutiao-ali.juheapi.com/toutiao/index",
    //     method : 'GET',
    //     headers : {"Authorization" : "APPCODE 2bc0b379f81c4a45abe47324afdc610d"}
    //   }).then((data)=>console.log(data));
    //获取新闻信息 
  }

  render() {
    return (
      <div style={{minWidth:"1200px"}}>
        <MuseumNews />
        <Row>
          <Col span={8}>
            <MuseumQuickInfo/>
          </Col>
          <Col span={8}>
            <InternentNews/>
          </Col>
          <Col span={8}>
            占位图
            <FriendLink/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default NewsPage;