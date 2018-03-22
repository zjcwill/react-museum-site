import axios from "axios";
import { xLCId, xLCKey } from "../utils/globalKey";

const headers = {
  "X-LC-Id": xLCId,
  "X-LC-Key": xLCKey,
  "Content-Type": "application/json"
};

//新建文章
export function newArticle(data){
  const time = new Date().getTime();
  return axios({
    method: "POST",
    url:`https://hd7nxqxs.api.lncld.net/1.1/classes/Article`,
    headers:{...headers},
    data:data
  })
}
//获取文章
export function getArticle(){
  return axios({
    method:"GET",
    url:`https://hd7nxqxs.api.lncld.net/1.1/classes/Article`,
    headers:{...headers},
  })
}
//获取指定ID文章
export function getTheArticle(id){
  return axios({
    method:"GET",
    url:`https://hd7nxqxs.api.lncld.net/1.1/classes/Article/${id}`,
    headers:{...headers},
  })
}
//编辑指定ID文章
export function editTheArticle(id,data){
  //@id = objectId
  return axios({
    method:"PUT",
    url:`https://hd7nxqxs.api.lncld.net/1.1/classes/Article/${id}`,
    headers:{...headers},
    data:data
  })
}
//删除指定ID文章
export function deleteTheArticle(id){
  //@id = objectId
  return axios({
    method:"DELETE",
    url:`https://hd7nxqxs.api.lncld.net/1.1/classes/Article/${id}`,
    headers:{...headers}
  })
}

//获取banner图片
export function loadBanner(options = { "Content-Type": "application/json" }) {
  return axios({
    method: "GET",
    url: "https://hd7nxqxs.api.lncld.net/1.1/classes/Banner",
    headers: { ...headers, ...options }
  });
}
//获取所有漫游图资源
export function loadViewer(options = { "Content-Type": "application/json" }){
  return axios({
    method: "GET",
    url: "https://hd7nxqxs.api.lncld.net/1.1/classes/Viewer",
    headers: {...headers,...options}
  });
}
//获取指定漫游图资源
export function loadTheViewer(id,options = { "Content-Type": "application/json" }){
  return axios({
    method: "GET",
    params: {
      where:{"name":`viewer${id}`}
    },
    url: "https://hd7nxqxs.api.lncld.net/1.1/classes/Viewer",
    headers: {...headers,...options}
  });
}