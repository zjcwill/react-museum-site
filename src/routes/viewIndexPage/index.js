import React from "react";

//图片预览图
//{parmas} url imgUrl
const ViewImgPreview = (props) => {
    const defaultImg = props.imgUrl || "http://via.placeholder.com/1200x400";
    return (
        <a href={props.url}>
            <img
                style={{ width: "100%", height: "400px" }}
                src={defaultImg} />
        </a>
    )
}

class ViewIndexPage extends React.Component {
    render() {
        return (
            <div>
                <ViewImgPreview url="" />
                <ViewImgPreview url="" />
                <ViewImgPreview url="" />
                <ViewImgPreview url="" />
            </div>
        )
    }
}

export default ViewIndexPage;