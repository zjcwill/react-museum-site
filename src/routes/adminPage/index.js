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
  Divider,
  Form,
  Select,
  Radio
} from "antd";
import _ from "lodash";
import { connect,actions } from "mirrorx";

import MainPageSetting from '../../components/admin/mainPageSetting';//主页设置
import ViewerSetting from '../../components/admin/viewerSetting';//全景图设置组件
import NewsSetting from '../../components/admin/newsSetting';//新闻设置组件
import AdminAccountSetting from '../../components/admin/adminAccountSetting/index';//账号设置组件
import UploadImg from '../../components/admin/uploadImg';//上传图片组件

const { TabPane } = Tabs;
const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const AdminPage = connect()(props => {
  const isLogined = true ||props.data.isLogined; //开发环境 默认登陆状态为真
  const changeTab = (key)=>{
    if(key == 2){
      actions.NewSetting.getArticles();
    }
  }
  return (
   isLogined ?
   ( <div>
    <Tabs onChange={changeTab}>
      <TabPane tab="主页" key="1">
        {MainPageSetting()}
      </TabPane>
      <TabPane tab="资讯" key="2">
        <NewsSetting/>
      </TabPane>
      <TabPane tab="全景图" key="3">
       {ViewerSetting()}
      </TabPane>
      <TabPane tab="管理员账号设置" key="4">
        {AdminAccountSetting()}
      </TabPane>
    </Tabs>
  </div>
  ):
   (<Row type="flex" align="middle" justify="center">
     <Col>
     <div style={{minHeight:'500px',fontSize:'30px',paddingTop:'100px',textAlign:'center'}}>
        <p style={{paddingBottom:'100px'}}>尚未登陆，无法访问该页面</p>
        <Button 
          type="primary"
          size="large" 
          onClick={()=>{
          actions.routing.push("/signin");
        }
        }>返回登陆页面</Button>
     </div>
     </Col>
   </Row>)
  );
});

export default connect(state=>{
  return {data:state.SigninPage}
})(AdminPage);
