import React from "react";
import mirror, { actions, connect, Link } from "mirrorx";
import { Row, Col, Card, Tabs, Button, Spin } from "antd";
import "./index.css";
import { getArticle } from "../../services/indexPage";
import _ from "lodash";
const { TabPane } = Tabs;

mirror.model({
  name: "NewsIndexPage",
  initialState: {
    notice: [],
    quickNews: []
  },
  reducers: {
    save(state, data) {
      return { ...state, ...data };
    }
  },
  effects: {
    async getNewsTitleAndId() {
      getArticle().then(resp => {
        console.log(resp);
        const results = _.get(resp, "data.results");
        if (results) {
          const notice = []; //公告
          const quickNews = []; //新闻
          results.forEach(item => {
            if (item.category == 1) {
              quickNews.push(item);
            } else {
              notice.push(item);
            }
          });

          actions.NewsIndexPage.save({
            notice: notice,
            quickNews: quickNews
          });
        } else {
          console.log("报错了");
        }
      });
    }
  }
});

mirror.hook((action, getState) => {
  const { routing: { location } } = getState();
  if (
    action.type === "@@router/LOCATION_CHANGE" &&
    location.pathname === "/news"
  ) {
    actions.NewsIndexPage.getNewsTitleAndId();
  }
});

//占位图统一格式
const placeholdImg = { width: "100%", height: "200px" };

// connect state with component
const App = connect()(props => (
  <div>
    <h1>{props.count}</h1>
    {/* dispatch the actions */}
    <button onClick={() => actions.app.decrement()}>-</button>
    <button onClick={() => actions.app.increment()}>+</button>
    {/* dispatch the async action */}
    <button onClick={() => actions.app.incrementAsync()}>+ Async</button>
  </div>
));

//馆内公告
const MuseumNews = props => {
  return (
    <div>
      <BoradInformation data={props.data} />
    </div>
  );
};

//公告栏&重要活动（占位图）
const BoradInformation = props => {
  console.log("公告栏", props.data);
  return (
    <Row style={{ paddingTop: "20px" }}>
      <Col span={8}>
        <Card
          title="公告栏"
          style={{ width: "100%", maxHeight: "200px" }}
          loading={false}
          className="news-card-item"
        >
          {props.data.length > 0 ? (
            props.data.map((item,index) => {
              return (
                <Link to={`/detailPage/?class=notice;id=${item.objectId}`} key={index}>
                  <p>{item.title}</p>
                </Link>
              );
            })
          ) : (
            <Spin />
          )}
        </Card>
      </Col>
      <Col span={16} style={{ paddingLeft: "20px" }}>
        <img style={placeholdImg} src="http://via.placeholder.com/800x200" />
      </Col>
    </Row>
  );
};
// 博物馆快讯
const MuseumQuickInfo = props => {
  return (
    <Card
      title="博物馆快讯"
      style={{ width: "100%", height: "400px" }}
      loading={false}
      className="news-card-item"
    >
      {props.data.length > 0 ? (
            props.data.map((item,index) => {
              return (
                <Link to={`/detailPage/?class=quickInfo;id=${item.objectId}`} key={index}>
                  <p>{item.title}</p>
                </Link>
              );
            })
          ) : (
            <Spin />
          )}
    </Card>
  );
};

//互联网新闻系统
const InternentNews = props => {
  return (
    <Card
      title="互联网新闻"
      style={{ width: "90%", height: "400px", marginLeft: "20px" }}
      loading={false}
      className="news-card-item"
    >
      <Tabs
        defaultActiveKey="1"
        onChange={e => {
          console.log(e);
        }}
      >
        <TabPane tab="新闻" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="娱乐" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="科技" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </Card>
  );
};

//占位图
const PlaceHoldImg = () => {
  return (
    <div>
      <img
        style={{ width: "100%", height: "190px", paddingBottom: "10px" }}
        src="http://via.placeholder.com/220x200"
      />
    </div>
  );
};

//友链接模块
const FriendLink = () => {
  return (
    <Card
      style={{
        width: "100%",
        height: "200px",
        background: "rgb(190, 200, 200)"
      }}
    >
      <FriendLinkItem name="友链网" href="https://www.baidu.com" />
      <FriendLinkItem name="友链网" href="https://www.baidu.com" />
      <FriendLinkItem name="友链网" href="https://www.baidu.com" />
      <FriendLinkItem name="友链网" href="https://www.baidu.com" />
      <FriendLinkItem name="友链网" href="https://www.baidu.com" />
      <FriendLinkItem name="友链网" href="https://www.baidu.com" />
      <FriendLinkItem name="友链网" href="https://www.baidu.com" />
      <FriendLinkItem name="友链网" href="https://www.baidu.com" />
    </Card>
  );
};

//友链项
const FriendLinkItem = props => (
  <Button
    ghost
    style={{
      marginRight: "10px",
      marginBottom: "10px",
      width: "95px",
      height: "55px"
    }}
  >
    <a href={props.href}>{props.name}</a>
  </Button>
);

const NewsPage = connect(state => {
  return { data: state.NewsIndexPage };
})(props => {
  return (
    <div style={{ minWidth: "1200px" }}>
      <MuseumNews data={props.data.notice} />
      <Row style={{ paddingTop: "20px" }}>
        <Col span={8}>
          <MuseumQuickInfo data={props.data.quickNews} />
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
  );
});

export default NewsPage;
