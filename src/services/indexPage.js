import axios from "axios";
import { xLCId, xLCKey } from "../utils/globalKey";

const headers = {
  "X-LC-Id": xLCId,
  "X-LC-Key": xLCKey
};
//获取banner图片
export function loadBanner(options = { "Content-Type": "application/json" }) {
  return axios({
    method: "GET",
    url: "https://hd7nxqxs.api.lncld.net/1.1/classes/Banner",
    headers: { ...headers, ...options }
  });
}
//获取漫游图资源
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