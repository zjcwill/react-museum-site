import React from "react";
import { Row, Col, Tabs, Card, List, Upload, Button, Icon, Spin } from "antd";
import { appId, appKey, xLCId, xLCKey } from "../../utils/globalKey";
import AV from "leancloud-storage";
import axios from "axios";
import _ from "lodash";

const { TabPane } = Tabs;

//上传图片头部
const headers = {
  "X-LC-Id": xLCId,
  "X-LC-Key": xLCKey
};
//初始化learncloud
AV.init({ appId, appKey });

//主页设置
const MainPageSetting = props => {
  const bannerData = [
    {
      title: "Ant Design Title 1"
    },
    {
      title: "Ant Design Title 2"
    },
    {
      title: "Ant Design Title 3"
    },
    {
      title: "Ant Design Title 4"
    }
  ];

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

  const bannerSetting = (
    <Card title="轮播图">
      <List
        itemLayout="horizontal"
        dataSource={bannerData2}
        renderItem={item => (
          <List.Item>
            {console.log("88888", item.fileName)}
            <List.Item.Meta
              title={<UploadImg fileName={item.fileName} type={item.type} />}
            />
          </List.Item>
        )}
      />
    </Card>
  );

  const activitySetting = (
    <Card title="活动">
      <List
        itemLayout="horizontal"
        dataSource={bannerData}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </Card>
  );

  return (
    <div>
      <Row>{bannerSetting}</Row>
      <Row style={{ marginTop: "20px" }}>{activitySetting}</Row>
    </div>
  );
};

const AdminPage = props => {
  return (
    <div>
      <Tabs>
        <TabPane tab="主页" key="1">
          {MainPageSetting()}
        </TabPane>
        <TabPane tab="资讯" key="2">
          资讯
        </TabPane>
        <TabPane tab="全景图" key="3">
          全景图
        </TabPane>
      </Tabs>
    </div>
  );
};

//上传图片组件
class UploadImg extends React.Component {
  state = {
    fileList: [
      //   {
      //     uid: -1,
      //     name: "xxx.png",
      //     status: "done",
      //     url: "http://www.baidu.com/xxx.png"
      //   }
    ],
    isLoading: true
  };
  handleChange = info => {
    let fileList = info.fileList;

    // 1. Limit the number of uploaded files
    //    Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    // 3. filter successfully uploaded files according to response from server(成功上传回调)
    fileList = fileList.filter(file => {
      if (file.response) {
        axios({
          method: "POST",
          url: " https://hd7nxqxs.api.lncld.net/1.1/classes/Banner",
          headers: { ...headers, "Content-Type": "application/json" },
          data: JSON.stringify({
            name: this.props.fileName,
            picture: {
              id: file.response.objectId,
              __type: "File"
            }
          })
        }).then(() => {
          this.getData();
        });
        return file.response.status === "success";
      }
      return true;
    });

    this.setState({ fileList });
  };

  //获取图片在同一表中名字相同，时间最新的一个
  getData() {
    try {
      const data = axios({
        url: `https://hd7nxqxs.api.lncld.net/1.1/classes/${this.props.type}`,
        method: "GET",
        headers: { ...headers, "Content-Type": "application/json" }
      }).then(response => {
        let data = response.data.results.filter(
          item => item.name === this.props.fileName
        );
        data = _.maxBy(data, item => item.createdAt);//按创建时间取最新上传的一条
        this.setState({
          isLoading: false,
          fileList: _.isNil(data)
            ? []
            : [
                {
                  uid: -1,
                  name: data.name,
                  status: "done",
                  url: data.picture.url
                }
              ]
        });
      });
    } catch (error) {
      console.log("获取上传图片",error);
    }
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const props = {
      accept: ".png,.jpg",
      headers: headers,
      onChange: this.handleChange,
      action: `https://hd7nxqxs.api.lncld.net/1.1/files/${this.props.fileName}`,
      multiple: false
    };

    return (
      <div>
        {this.state.isLoading ? (
          <Spin />
        ) : (
          <Upload {...props} fileList={this.state.fileList}>
            <Button>
              <Icon type="upload" /> 上传
            </Button>
          </Upload>
        )}
      </div>
    );
  }
}

export default AdminPage;
