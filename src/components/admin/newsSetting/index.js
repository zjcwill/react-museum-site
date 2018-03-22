import React from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Input,
  Alert,
  notification,
  Select,
  Table,
  Card
} from "antd";
// 引入编辑器以及编辑器样式
import moment from 'moment';
import mirror, { actions, connect } from "mirrorx";
import BraftEditor from "braft-editor";
import "braft-editor/dist/braft.css";
import "./index.css";

import { getArticle, newArticle } from "../../../services/indexPage";
const { Option } = Select;

mirror.model({
  name: "NewSetting",
  initialState: {
    quickInfoData: [],
    noticeData: []
  },
  reducers: {
    save(state, data) {
      return { ...state, ...data };
    }
  },
  effects: {
    async getArticles() {
      getArticle().then(resp => {
        const quickInfo = resp.data.results.filter((item) => item.category == 1);
        const notice = resp.data.results.filter((item) => item.category == 2);
        actions.NewSetting.save({
          quickInfoData: quickInfo
        });
        actions.NewSetting.save({
          noticeData: notice
        });
      });
    }
  }
});

class NewsSetting extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      editorTitle: "",
      editorCategory: "",
      editorContent: ""
    };
  }
  handleSelectHandle = val => {
    this.setState({
      editorCategory: val
    });
  };
  //Modal
  showModal = () => {
    this.setState({
      visible: true,
      editorTitle: "",
      editorCategory: "",
      editorContent: ""
    });
  };
  handleOk = e => {
    //创建文章逻辑
    if (
      !(
        this.state.editorCategory &&
        this.state.editorTitle &&
        this.state.editorContent
      )
    ) {
      notification["error"]({
        message: "请填写必填项"
      });
      return;
    }
    newArticle({
      id: new Date().getTime(),
      title: this.state.editorTitle,
      category: this.state.editorCategory,
      content: this.state.editorContent
    }).then(resp => {
      const error = resp.error || false;
      if (!error) {
        notification["success"]({
          message: "新建文章成功"
        });
        actions.NewSetting.getArticles();
      } else {
        notification["error"]({
          message: JSON.stringify(resp)
        });
      }
    });
    this.setState({
      visible: false,
      editorTitle: "",
      editorCategory: "",
      editorContent: ""
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
      editorTitle: "",
      editorCategory: "",
      editorContent: ""
    });
  };
  //Editor
  handleChange = content => {
    this.setState({ editorContent: content });
  };

  render() {
    const { data: { quickInfoData, noticeData } } = this.props;

    const editorProps = {
      height: 500,
      contentFormat: "html",
      initialContent: "",
      onChange: this.handleChange
    };

    const tableColumns = [{
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: '标题',
      dataIndex: 'title',
      key: 'title'
    }, {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render:(text)=>{
        return (<span>
          {moment(text).format('YYYY-MM-DD, h:mm:ss a')}
        </span>)
      }
    }, {
      title: '操作',
      dataIndex: 'edit',
      key: 'edit',
      render: (text, record) => (
        <span>
          <a href="#">编辑</a>
          <span className="ant-divider" />
          <a href="#">删除</a>
        </span>
      )
    }]

    return (
      <div>
        <Row>
          <Button type="primary" onClick={this.showModal}>
            新增文章
          </Button>
          {/*新建文章弹窗*/}
          <Modal
            title="新增文章"
            width={"800px"}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>
              <span style={{ color: "red" }}>*</span>文章标题:
            </p>
            <Input
              onChange={e => {
                this.setState({ editorTitle: e.target.value });
              }}
              value={this.state.editorTitle}
            />
            <p>
              <span style={{ color: "red" }}>*</span>栏目:
            </p>
            <Select
              defaultValue={"1"}
              value={this.state.editorCategory}
              onChange={this.handleSelectHandle}
              style={{ width: 120 }}
            >
              <Option value="1">博物馆快讯</Option>
              <Option value="2">公告栏</Option>
            </Select>
            <BraftEditor {...editorProps} />
          </Modal>
        </Row>
        {/*表格*/}
        <Row>
          <Card title="博物馆快讯" style={{marginTop:"20px"}}>
            <Table rowKey="objectId" columns={tableColumns} row dataSource={quickInfoData}/>
          </Card>
        </Row>
        <Row>
          <Card title="公告栏" style={{marginTop:"20px"}}>
            <Table rowKey="objectId" columns={tableColumns} dataSource={noticeData}/>
          </Card>
        </Row>
      </div>
    );
  }
}

export default connect(state => {
  return { data: state.NewSetting }
})(NewsSetting);
