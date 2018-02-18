import React from "react";
import mirror,{ Link, actions, connect } from "mirrorx";
import { loadViewer } from '../../services/indexPage';
import _ from "lodash";
import qs from 'query-string'

//Redux
mirror.model({
  name:"ViewIndexPage",
  initialState:{
      isLoading:true,
      viewerURL:[]
  },
  reducers: {
      save(state, data) {
          return {...state,...data}
      }
  },
  effects:{
      async getViewerURL(){
          let { data: { results } } = await loadViewer();
          results = _.groupBy(results, "name");
          let viewerURL = [];
          _.forEach(results,(elements)=>{
              elements = _.maxBy(elements, item => item.createdAt);
              viewerURL.push(elements.picture.url);
          });
          console.log("****",viewerURL);
          actions.IndexPage.save({
              viewerURL: viewerURL,
              isLoading: false
          });
      }
  }
});

mirror.hook((action, getState) => {

  const { routing: { location } } = getState()

  if ( action.type === "@@router/LOCATION_CHANGE" && location.pathname === '/viewerIndex' ) {
      console.log("进入全景漫游列表页")
      actions.ViewIndexPage.getViewerURL()
  }
})

//图片预览图
//{parmas} url imgUrl
const ViewImgPreview = props => {
  const defaultImg = props.imgUrl || "http://via.placeholder.com/1200x400";
  return (
    <Link to={props.url}>
      <img style={{ width: "100%", height: "400px" }} alt="" src={defaultImg} />
    </Link>
  );
};

class ViewIndexPage extends React.Component {
  render() {
    return (
      <div>
        <ViewImgPreview url="/viewer/1" />
        <ViewImgPreview url="/viewer/1" />
        <ViewImgPreview url="/viewer/1" />
        <ViewImgPreview url="/viewer/1" />
      </div>
    );
  }
}

export default connect(state=>{return {data:state.ViewIndexPage}})(ViewIndexPage);
