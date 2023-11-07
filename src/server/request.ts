import { message } from "antd";

import axios from "axios";
import Cookies from "js-cookie";

import { ENDPOINT, TOKEN_PORTFOLIO } from "../constants";

const request = axios.create({
  baseURL: `${ENDPOINT}api/v1/`,
  timeout: 10000,
  headers: { Authorization: `Bearer ${Cookies.get(TOKEN_PORTFOLIO)}` },
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    message.error(err?.response?.data?.message);
    return Promise.reject(err);
  }
);

export default request;
