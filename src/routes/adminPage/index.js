import React from "react";
import {
  Row,
  Col,
  Tabs,
  Card,
  List,
  Upload,
  Button,
  Icon,
  Spin,
  Input,
  Modal,
  Table,
  Divider
} from "antd";
import { appId, appKey, xLCId, xLCKey } from "../../utils/globalKey";
import AV from "leancloud-storage";
import axios from "axios";
import _ from "lodash";
import { connect } from 'mirrorx';

const { TabPane } = Tabs;
const Search = Input.Search;

//上传图片头部
const headers = {
  "X-LC-Id": xLCId,
  "X-LC-Key": xLCKey
};
//初始化learncloud
AV.init({ appId, appKey });
//管理员账号设置
const AdminAccountSetting = props => {
  return (
    <Card title="管理员账号设置">
      <Row>
        <Col span={6}>
          <Input value="zjcwill@foxmail.com" />
        </Col>
      </Row>
      <Row style={{marginTop:"10px"}}>
        <Col span={6}>
          <Search placeholder="输入新密码" type="password" enterButton="设置" />
        </Col>
      </Row>
    </Card>
  );
};
//# 主页设置
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
  //## 活动设置
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

//# 全景图

//全景图表格
//表头
const columns = [{
  title: '名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '简介',
  dataIndex: 'intr',
  key: 'intr',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">编辑</a>
      <Divider type="vertical" />
      <a href="#">删除</a>
    </span>
  ),
}];
//测试数据
const testData = [{
  key: '1',
  name: 'John Brown',
  intr: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  intr: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  intr: 'Sidney No. 1 Lake Park',
}];

//## 全景图设置
class ViewerSetting extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
        <Row>
          <Button type="primary" onClick={this.showModal}>添加全景图</Button>
        </Row>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        <Row style={{marginTop:"20px"}}>
          <Card>
            <Table columns={columns} dataSource={testData} />
          </Card>
        </Row>
      </div>
    );
  }
}


const AdminPage = connect()(props => {
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
          <ViewerSetting />
        </TabPane>
        <TabPane tab="管理员账号设置" key="4">
          {AdminAccountSetting()}
        </TabPane>
      </Tabs>
    </div>
  );
})

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
      axios({
        url: `https://hd7nxqxs.api.lncld.net/1.1/classes/${this.props.type}`,
        method: "GET",
        headers: { ...headers, "Content-Type": "application/json" }
      }).then(response => {
        let data = response.data.results.filter(
          item => item.name === this.props.fileName
        );
        data = _.maxBy(data, item => item.createdAt); //按创建时间取最新上传的一条
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
      console.log("获取上传图片", error);
    }
  }

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
