import React from "react";
import mirror, { Link, actions, connect } from "mirrorx";
import { Row, Col, Spin } from "antd";
import { loadViewer } from "../../services/indexPage";
import _ from "lodash";
import qs from "query-string";
import "./style.css";

mirror.model({
  name: "ViewIndexPage",
  initialState: {
    isLoading: true,
    viewerURL: []
  },
  reducers: {
    save(state, data) {
      return { ...state, ...data };
    }
  },
  effects: {
    async getViewerURL() {
      let { data: { results } } = await loadViewer();
      results = _.groupBy(results, "name");
      let viewerURL = [];
      _.forEach(results, elements => {
        elements = _.maxBy(elements, item => item.createdAt);
        viewerURL.push(elements.picture.url);
      });
      actions.ViewIndexPage.save({
        viewerURL: viewerURL,
        isLoading: false
      });
    }
  }
});

mirror.hook((action, getState) => {
  const { routing: { location } } = getState();

  if (
    action.type === "@@router/LOCATION_CHANGE" &&
    location.pathname === "/viewerIndex"
  ) {
    actions.ViewIndexPage.getViewerURL();
  }
});

//图片预览图每一项
const ViewImgPreview = props => {
  const defaultImg = props.imgUrl || "http://via.placeholder.com/1200x400";
  return (
    <Link className={"viewer"} to={{pathname:`/viewer`,search:`?id=${props.index}`}}>
      <img alt="" src={defaultImg} />
    </Link>
  );
};

//页面
class ViewIndexPage extends React.Component {
  render() {
    return this.props.data.viewerURL.length > 0 ? (
      this.props.data.viewerURL.map((item, index) => {
        return <ViewImgPreview key={index} imgUrl={item} index={index} />;
      })
    ) : (
      <Row>
        <Col>
          <Spin />
        </Col>
      </Row>
    );
  }
}

export default connect(state => {
  return { data: state.ViewIndexPage };
})(ViewIndexPage);
