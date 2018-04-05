import React from 'react';
import _ from 'lodash';
import {Spin, Button, Upload, Icon} from 'antd';
import { xLCId, xLCKey } from "../../../utils/globalKey";
import axios from 'axios';

//上传图片头部
const headers = {
    "X-LC-Id": xLCId,
    "X-LC-Key": xLCKey
  };

//上传图片组件
class UploadImg extends React.Component {
    state = {
      fileList: [],
      isLoading: true
    };
    handleChange = info => {
      let fileList = info.fileList;
  
      fileList = fileList.slice(-2);
  
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });
  
      fileList = fileList.filter(file => {
        if (file.response) {
          axios({
            method: "POST",
            url: `https://hd7nxqxs.api.lncld.net/1.1/classes/${this.props.type}`,
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
        console.error("获取上传图片", error);
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

export default UploadImg;