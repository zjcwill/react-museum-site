import React from "react";
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  message
} from "antd";
import { xLCId, xLCKey } from "../../utils/globalKey";
import axios from "axios";
import "./index.css";
import mirror, {actions} from 'mirrorx';

mirror.model({
  name:"SigninPage",
  initialState:{
    isLogined:false
  },
  reducers:{
    save(state, data) {
      return { ...state, ...data };
    },
    changeLogin(state,data){      
     return {...state,...{isLogined:data}}
    }
  }
})


const FormItem = Form.Item;
const headers = {
  "X-LC-Id": xLCId,
  "X-LC-Key": xLCKey
};
const success = () => {
  message.success("成功登陆！");
};
const error = () => {
  message.error("账号或密码有误，请重试！");
};

class LoginForm extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios({
          method: "GET",
          url:
            "https://leancloud.cn:443/1.1/classes/Admin/5a86ccfdee920a00447c40a9",
          headers: { ...headers },
          data: { ts: new Date() }
        }).then(resp => {
            const { data } = resp;
            if(values.userName===data.email && values.password===data.password){
                success();
                actions.SigninPage.changeLogin(true);
                actions.routing.push("/admin");
            } else {
                error();
                return;
            }
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: "请输入你的用户名" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="用户名"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "请输入你的密码！" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="密码"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>记住我</Checkbox>)}
        </FormItem>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登陆
        </Button>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

const SigninPage = props => {

  return (
    <Row
      type="flex"
      align="middle"
      justify="center"
      style={{ marginTop: "50px" }}
    >
      <Col span={6}>
        <WrappedLoginForm history={props.history} />
      </Col>
    </Row>
  );
};

export default SigninPage;
