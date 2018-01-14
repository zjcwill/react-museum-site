

import React from 'react';
// import{ History,actions } from 'mirrorx';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import './index.css';
const FormItem = Form.Item;

class LoginForm extends React.Component {
    constructor(props){
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.history.push("/signin", null)         
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        {console.log(this.props)}
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入你的用户名' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                        )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入你的密码！' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                        )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住我</Checkbox>
                        )}
                    <a className="login-form-forgot" href="">忘记密码</a>
                </FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登陆
                </Button>
            </Form>
        );
    }
}

const WrappedLoginForm = Form.create()(LoginForm);


const SigninPage = (props) => {
    { console.log(props.history) }
    const toAdminPage = ()=>{
        this.props.history.push("/signin", null);
    }
    return (
        <div>
            <Row>
                <div style={{maxWidth:'300px'}}>
                    <WrappedLoginForm history={props.history}/>
                </div>
            </Row>
            {/* <button onClick={() => { props.history.push("/signin", null) }}>登陆</button> */}
        </div>)
}

export default SigninPage;