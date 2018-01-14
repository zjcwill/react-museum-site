import React from 'react';
import { Row, Col, Tabs, Card, List,Upload, Button, Icon } from 'antd';
const { TabPane } = Tabs;



//主页设置
const MainPageSetting = (props) => {
    const bannerData = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];
    const bannerSetting = (
        <Card title="轮播图">
            <List
                itemLayout="horizontal"
                dataSource={bannerData}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={<UploadImg/>}
                        />
                    </List.Item>
                )}
            />
        </Card>);
    
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
            <Row>
                {bannerSetting}
            </Row>
            <Row style={{marginTop:"20px"}}>
                {activitySetting}
            </Row>
        </div>
    )
};

const AdminPage = (props) => {

    return (
        <div>
            <Tabs>
                <TabPane tab="主页" key="1">{MainPageSetting()}</TabPane>
                <TabPane tab="资讯" key="2">资讯</TabPane>
                <TabPane tab="全景图" key="3">全景图</TabPane>
            </Tabs>
        </div>
    )
}

//上传图片组件
class UploadImg extends React.Component {
    state = {
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'http://www.baidu.com/xxx.png',
      }],
    }
    handleChange = (info) => {
      let fileList = info.fileList;
  
      // 1. Limit the number of uploaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-2);
  
      // 2. read from response and show file link
      fileList = fileList.map((file) => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file;
      });
  
      // 3. filter successfully uploaded files according to response from server
      fileList = fileList.filter((file) => {
        if (file.response) {
          return file.response.status === 'success';
        }
        return true;
      });
  
      this.setState({ fileList });
    }
    render() {
      const props = {
        action: '//jsonplaceholder.typicode.com/posts/',
        onChange: this.handleChange,
        multiple: true,
      };
      return (
        <Upload {...props} fileList={this.state.fileList}>
          <Button>
            <Icon type="upload" /> 上传
          </Button>
        </Upload>
      );
    }
  }
  

export default AdminPage;
