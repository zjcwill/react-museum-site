import React from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Input,
  Alert,
  notification,
  Select
} from "antd";
// 引入编辑器以及编辑器样式
import mirror, { actions, connect } from "mirrorx";
import BraftEditor from "braft-editor";
import "braft-editor/dist/braft.css";
import "./index.css";

import { getArticle, newArticle } from "../../../services/indexPage";
const { Option } = Select;

mirror.model({
  name: "NewSetting",
  initialState: {
    data: null
  },
  reducers: {
    save(state, data) {
      return { ...state, ...data };
    }
  },
  effects: {
    async getArticles() {
      getArticle().then(resp => {
        actions.NewSetting.save({
          data: resp.data
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
    const editorProps = {
      height: 500,
      contentFormat: "html",
      initialContent: "",
      onChange: this.handleChange
      // onRawChange: this.handleRawChange
    };
    return (
      <div>
        <Row>
          <Button type="primary" onClick={this.showModal}>
            新增文章
          </Button>
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
        <Row>展示数据</Row>
      </div>
    );
  }
}

export default connect()(NewsSetting);
