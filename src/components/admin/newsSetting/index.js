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
  Card,
  Popconfirm
} from "antd";
// 引入编辑器以及编辑器样式
import moment from 'moment';
import mirror, { actions, connect } from "mirrorx";
import BraftEditor from "braft-editor";
import "braft-editor/dist/braft.css";
import "./index.css";

import { getArticle, newArticle, editTheArticle, deleteTheArticle } from "../../../services/indexPage";
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
      editorContent: "",
      editorId: "",
      isEdit: false,
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

    if (this.state.isEdit) {
      //编辑文章
      editTheArticle(this.state.editorId, {
        title: this.state.editorTitle,
        category: this.state.editorCategory,
        content: this.state.editorContent
      }).then((resp) => {
        const error = resp.error || false;
        if (!error) {
          notification["success"]({
            message: "编辑文章成功"
          });
        }
        actions.NewSetting.getArticles();
        this.setState({
          visible: false,
          editorTitle: "",
          editorCategory: "",
          editorContent: ""
        });
      })
    } else {
      //新建文章
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
          this.setState({
            visible: false,
            editorTitle: "",
            editorCategory: "",
            editorContent: ""
          });
        } else {
          notification["error"]({
            message: JSON.stringify(resp)
          });
        }
      });
    }

  };
  handleCancel = e => {
    
    this.setState({
      visible: false,
      isEdit: false,
      editorTitle: "",
      editorCategory: "",
      editorContent: ""
    });
  };
  //Editor
  handleChange = content => {
    this.setState({ editorContent: content });
  };
  //编辑文章
  handleEdit = (record) => {
    // console.log("edit", record.content)
    this.setState({
      visible: true,
      editorTitle: record.title,
      editorCategory: record.category,
      editorContent: record.content,
      isEdit: true,
      editorId: record.objectId
    })
  }
  //删除文章
  handleDelete = (id) => {    

    function confirm(e) {
      deleteTheArticle(id).then((resp) => {
        const error = resp.error || false;
        if (!error) {
          notification["success"]({
            message: "删除文章成功"
          });
          actions.NewSetting.getArticles();
          this.setState({
            visible: false,
            editorTitle: "",
            editorCategory: "",
            editorContent: ""
          });
        }
      })
    }

    return (
      <Popconfirm title="你确定要删除这条资讯?" onConfirm={confirm} okText="确定" cancelText="取消">
        <a href="#">删除</a>
      </Popconfirm>
    )
  }

  render() {
    const { data: { quickInfoData, noticeData } } = this.props;
    const editorProps = {
      height: 500,
      contentFormat: "html",
      initialContent: this.state.editorContent,
      contentId: this.state.isEdit ? this.state.editorId : null,
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
      render: (text) => {
        return (<span>
          {moment(text).format('YYYY-MM-DD, h:mm:ss a')}
        </span>)
      }
    }, {
      title: '操作',
      dataIndex: 'edit',
      key: 'edit',
      render: (text, record) => {
        const that = this;
        return (
          <span>
            <a onClick={() => { that.handleEdit(record) }}>编辑</a>
            <span className="ant-divider" />
            {this.handleDelete(record.objectId)}
          </span>
        )
      }
    }]

    return (
      <div>
        <Row>
          <Button type="primary" onClick={this.showModal}>
            新增文章
          </Button>
          {/*新建文章弹窗*/}
          <Modal
            title={this.state.isEdit?"编辑文章":"新建文章"}
            width={"800px"}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确定"
            cancelText="取消"
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
          <Card title="博物馆快讯" style={{ marginTop: "20px" }}>
            <Table rowKey="objectId" columns={tableColumns} dataSource={quickInfoData} />
          </Card>
        </Row>
        <Row>
          <Card title="公告栏" style={{ marginTop: "20px" }}>
            <Table rowKey="objectId" columns={tableColumns} dataSource={noticeData} />
          </Card>
        </Row>
      </div>
    );
  }
}

export default connect(state => {
  return { data: state.NewSetting }
})(NewsSetting);
