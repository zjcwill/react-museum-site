import React from 'react';
import {Card, Row, Col, Input} from 'antd';

const Search = Input.Search;

//管理员账号设置
const AdminAccountSetting = props => {
    return (
      <Card title="管理员账号设置">
        <Row>
          <Col span={6}>
            <Input value="zjcwill@foxmail.com" />
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col span={6}>
            <Search placeholder="输入新密码" type="password" enterButton="设置" />
          </Col>
        </Row>
      </Card>
    );
  };

export default AdminAccountSetting;