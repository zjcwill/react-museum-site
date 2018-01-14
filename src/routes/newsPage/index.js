import React from 'react';
import mirror, { actions, connect,Link } from 'mirrorx';
// import axios from 'axios';
import { Row, Col, Card, Tabs,Button } from 'antd';
import './index.css';

const {TabPane} = Tabs;

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

//占位图统一格式
const placeholdImg = { width: '100%', height: '200px' };

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
    <Row style={{ paddingTop: '20px' }}>
      <Col span={8} >
        <Card title="公告栏" style={{ width: '100%', maxHeight: '200px' }} loading={false} className="news-card-item">
          <Link to="/newsPage/tech/1"><p>我馆周一闭馆。观众参观可提前短信预约、网上预约或现场领票，团体参观需提前电话预约，详见参观门票。</p></Link>
          <Link to="/newsPage/tech/1"><p>我馆周一闭馆。观众参观可提前短信预约、网上预约或现场领票，团体参观需提前电话预约，详见参观门票。</p></Link>
          <Link to="/newsPage/tech/1"><p>我馆周一闭馆。观众参观可提前短信预约、网上预约或现场领票，团体参观需提前电话预约，详见参观门票。</p></Link>
        </Card>
      </Col>
      <Col span={16} style={{ paddingLeft: '20px' }}>
        <img style={placeholdImg} src="http://via.placeholder.com/800x200" />
      </Col>
    </Row>
  )
}
// 博物馆快讯
const MuseumQuickInfo = (props) => {
  return (
    <Card title="博物馆快讯" style={{ width: '100%', height: '400px' }} loading={false} className="news-card-item">
      <p>我馆周一闭馆。观众参观可提前短信预约、网上预约或现场领票，团体参观需提前电话预约，详见参观门票。</p>
      <p>我馆周一闭馆。观众参观可提前短信预约、网上预约或现场领票，团体参观需提前电话预约，详见参观门票。</p>
      <p>我馆周一闭馆。观众参观可提前短信预约、网上预约或现场领票，团体参观需提前电话预约，详见参观门票。</p>
    </Card>
  )
}

//互联网新闻系统
const InternentNews = (props) => {
  return (
    <Card title="互联网新闻" style={{ width: '90%', height: '400px', marginLeft: '20px' }} loading={false} className="news-card-item">
      <Tabs defaultActiveKey="1" onChange={(e)=>{console.log(e)}}>
        <TabPane tab="新闻" key="1">Content of Tab Pane 1</TabPane>
        <TabPane tab="娱乐" key="2">Content of Tab Pane 2</TabPane>
        <TabPane tab="科技" key="3">Content of Tab Pane 3</TabPane>
      </Tabs>
    </Card>
  )
}

//占位图
const PlaceHoldImg = () => {
  return (
    <div>
      <img style={{ width: '100%', height: '190px', paddingBottom: '10px' }} src="http://via.placeholder.com/220x200" />
    </div>
  )
}

//友链接模块
const FriendLink = () => {
  return (
    <Card style={{ width: '100%', height: '200px',background: 'rgb(190, 200, 200)' }}>
       <FriendLinkItem name="友链网" href="https://www.baidu.com"/>
       <FriendLinkItem name="友链网" href="https://www.baidu.com"/>
       <FriendLinkItem name="友链网" href="https://www.baidu.com"/>
       <FriendLinkItem name="友链网" href="https://www.baidu.com"/>
       <FriendLinkItem name="友链网" href="https://www.baidu.com"/>
       <FriendLinkItem name="友链网" href="https://www.baidu.com"/>
       <FriendLinkItem name="友链网" href="https://www.baidu.com"/>
       <FriendLinkItem name="友链网" href="https://www.baidu.com"/>
    </Card>
  )
};

//友链项
const FriendLinkItem = (props)=>(
  <Button ghost style={{marginRight:'10px',marginBottom:'10px',width:'95px',height:'55px'}}><a href={props.href}>{props.name}</a></Button>
);

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
      <div style={{ minWidth: "1200px" }}>
        <MuseumNews />
        <Row style={{ paddingTop: '20px' }}>
          <Col span={8}>
            <MuseumQuickInfo />
          </Col>
          <Col span={8}>
            <InternentNews />
          </Col>
          <Col span={8}>
            <PlaceHoldImg />
            <FriendLink />
          </Col>
        </Row>
      </div>
    )
  }
}

export default NewsPage;