import React from "react";
import { Card, List} from 'antd';
import UploadImg from '../uploadImg/index';

//全景图设置
const ViewerSetting  = () => {
    const viewerData = [
      {
        type: "Viewer",
        fileName: "viewer1"
      },
      {
        type: "Viewer",
        fileName: "viewer2"
      },
      {
        type: "Viewer",
        fileName: "viewer3"
      },
      {
        type: "Viewer",
        fileName: "viewer4"
      }
    ];

    return (
      <Card title="全景图">
      <List
        itemLayout="horizontal"
        dataSource={viewerData}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<UploadImg fileName={item.fileName} type={item.type} />}
            />
          </List.Item>
        )}
      />
    </Card>
    )
  }

  export default ViewerSetting;