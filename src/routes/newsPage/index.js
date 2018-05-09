import React from "react";
import mirror, { actions, connect, Link } from "mirrorx";
import { Row, Col, Card, Tabs, Button, Spin, Divider } from "antd";
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
          console.error("报错了",results);
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
  return (
    <Card
      title="公告栏"
      style={{ width: "100%", height: "400px ", overflow: "auto" }}
      loading={false}
      className="news-card-item"
    >
      {props.data.length > 0 ? (
        props.data.map((item, index) => {
          return (
            <div key={item.objectId}>
              <Link
                to={`/detailPage/?class=notice;id=${item.objectId}`}
              >
                <p>{item.title}</p>
              </Link>
              {index != props.data.length - 1 ? <Divider /> : null}
            </div>
          );
        })
      ) : (
        <Spin />
      )}
    </Card>
  );
};
// 博物馆快讯
const MuseumQuickInfo = props => {
  return (
    <Card
      title="博物馆快讯"
      style={{ width: "100%", height: "600px", overflow: "auto" }}
      loading={false}
      className="news-card-item"
    >
      {props.data.length > 0 ? (
        props.data.map((item, index) => {
          return (
            <div key={item.objectId}>
              <Link
                to={`/detailPage/?class=quickInfo;id=${item.objectId}`}
              >
                <p>{item.title}</p>
              </Link>
              {index != props.data.length - 1 ? <Divider /> : null}
            </div>
          );
        })
      ) : (
        <Spin />
      )}
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
      <Row>
        <Col span={4}>
          <FriendLinkItem name="友链网" href="https://www.baidu.com" />
        </Col>
        <Col span={4}>
          <FriendLinkItem name="友链网" href="https://www.baidu.com" />
        </Col>
        <Col span={4}>
          <FriendLinkItem name="友链网" href="https://www.baidu.com" />
        </Col>
        <Col span={4}>
          <FriendLinkItem name="友链网" href="https://www.baidu.com" />
        </Col>
        <Col span={4}>
          <FriendLinkItem name="友链网" href="https://www.baidu.com" />
        </Col>
        <Col span={4}>
          <FriendLinkItem name="友链网" href="https://www.baidu.com" />
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <FriendLinkItem name="友链网" href="https://www.baidu.com" />
        </Col>
        <Col span={4}>
          <FriendLinkItem name="友链网" href="https://www.baidu.com" />
        </Col>
        <Col span={4}>
          <FriendLinkItem name="友链网" href="https://www.baidu.com" />
        </Col>
        <Col span={4}>
          <FriendLinkItem name="友链网" href="https://www.baidu.com" />
        </Col>
        <Col span={4}>
          <FriendLinkItem name="友链网" href="https://www.baidu.com" />
        </Col>
        <Col span={4}>
          <FriendLinkItem name="友链网" href="https://www.baidu.com" />
        </Col>
      </Row>
    </Card>
  );
};

//友链项
const FriendLinkItem = props => (
  <Button
    ghost
    style={{
      width: "95px",
      height: "55px",
      margin: "5px"
    }}
  >
    <a target="_blank" href={props.href}>
      {props.name}
    </a>
  </Button>
);

const NewsPage = connect(state => {
  return { data: state.NewsIndexPage };
})(props => {
  return (
    <div style={{ minWidth: "1200px" }}>
      <Row style={{ marginTop: "20px" }}>
        <Col span={12}>
          <MuseumQuickInfo data={props.data.quickNews} />
        </Col>
        <Col span={12}>
          <Row style={{ paddingLeft: "10px" }}>
            <MuseumNews data={props.data.notice} />
            <FriendLink />
          </Row>
        </Col>
      </Row>
    </div>
  );
});

export default NewsPage;
