import React from "react";
import { Link } from "mirrorx";

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

export default ViewIndexPage;
