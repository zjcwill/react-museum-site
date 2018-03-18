import React from 'react';
import UploadImg from '../uploadImg/index';
import {Card,List,Row} from 'antd';

//# 主页设置
const MainPageSetting = props => {
    
    const bannerData2 = [
      {
        type: "Banner",
        fileName: "banner1"
      },
      {
        type: "Banner",
        fileName: "banner2"
      },
      {
        type: "Banner",
        fileName: "banner3"
      },
      {
        type: "Banner",
        fileName: "banner4"
      }
    ];
    //## 轮播图设置
    const bannerSetting = (
      <Card title="轮播图">
        <List
          itemLayout="horizontal"
          dataSource={bannerData2}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<UploadImg fileName={item.fileName} type={item.type} />}
              />
            </List.Item>
          )}
        />
      </Card>
    );

    return (
      <div>
        <Row>{bannerSetting}</Row>
      </div>
    );
  };

  export default MainPageSetting;