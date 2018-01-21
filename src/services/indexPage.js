import axios from "axios";
import { xLCId, xLCKey } from "../utils/globalKey";

const headers = {
  "X-LC-Id": xLCId,
  "X-LC-Key": xLCKey
};

export function loadBanner(options = { "Content-Type": "application/json" }) {
  return axios({
    method: "GET",
    url: "https://hd7nxqxs.api.lncld.net/1.1/classes/Banner",
    headers: { ...headers, ...options }
  });
}
