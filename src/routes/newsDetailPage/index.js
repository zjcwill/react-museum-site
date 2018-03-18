import React from "react";
import "./style.css";
import { Breadcrumb, Row, Divider } from "antd";
import mirror, { actions, connect, Link } from "mirrorx";
import { getTheArticle } from "../../services/indexPage";

mirror.model({
  name: "NewsDetailPage",
  initialState: {
    data: null
  },
  reducers: {
    save(state, data) {
      return { ...state, ...data };
    }
  },
  effects: {
    async getTheArticle(id, category) {
      getTheArticle(id).then(resp => {
        actions.NewsDetailPage.save({
          data: resp.data
        });
      });
    }
  }
});

mirror.hook((action, getState) => {
  const { routing: { location } } = getState();
  if (
    action.type === "@@router/LOCATION_CHANGE" &&
    location.pathname === "/detailPage/" &&
    location.search
  ) {
    console.log("!!!进入详情页", location.search);

    const searchs = location.search.split(";");
    const category = searchs[0].split("=")[1];
    const id = searchs[1].split("=")[1];

    actions.NewsDetailPage.getTheArticle(id, category);
    // actions.NewsIndexPage.getNewsTitleAndId();
  }
});

const NewsDetailsPage = connect(state => {
  return { data: state.NewsDetailPage.data };
})(props => {
  const content = props.data ? props.data.content : "";
  function RenderHTML() {
    return { __html: content };
  }
  const category = props.data ? props.data.category : null;
  return (
    <div>
      <Row>
        <Breadcrumb>
          <Breadcrumb.Item>资讯</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">{category == "1" ? "快讯" : "公告"}</a>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row>
        <h2>{props.data ? props.data.title : ""}</h2>
        <Divider />
      </Row>
      <Row>
        <div dangerouslySetInnerHTML={RenderHTML()} />
        {}
      </Row>
    </div>
  );
});

export default NewsDetailsPage;
