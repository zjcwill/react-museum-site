import React from "react";
import { Link } from 'mirrorx';

//图片预览图
//{parmas} url imgUrl
const ViewImgPreview = (props) => {
    const defaultImg = props.imgUrl || "http://via.placeholder.com/1200x400";
    return (
        <Link to={"viewer/"+props.href}>
            <img
                style={{ width: "100%", height: "400px" }}
                src={defaultImg} />
        </Link>
    )
}

class ViewIndexPage extends React.Component {
    render() {
        return (
            <div>
                <ViewImgPreview url="" href="1"/>
                <ViewImgPreview url="" />
                <ViewImgPreview url="" />
                <ViewImgPreview url="" />
            </div>
        )
    }
}



export default ViewIndexPage;