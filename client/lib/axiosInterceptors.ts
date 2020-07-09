import Axios from "axios";
import { Message } from "at-ui";

// 请求拦截器
Axios.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === "development") {
      config.url = "/api" + config.url;
    }
    let token = JSON.parse(localStorage.getItem("token"));
    // 判断是否存在token，如果存在将每个页面header添加token
    if (token) {
      // koa-jwt的默认验证方式: {'authorization': "Bearer " + token}
      config.headers.common["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
Axios.interceptors.response.use(
  (response) => {
    // 对响应数据做处理
    return Promise.resolve(checkStatus(response));
  },
  (error) => {
    // 对响应错误做处理
    if (error.response) {
      let res = checkStatus(error.response);
      if (res.status === 401) {
        Message.error(res.msg);
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      }
      return Promise.reject(checkStatus(error.response));
    }
    return Promise.reject(error);
  }
);

// 处理错误状态
const checkStatus = (response) => {
  const status = response.status || -1000; // -1000 自己定义，连接错误的status

  if ((status >= 200 && status < 300) || status === 304) {
    // 如果http状态码正常，则直接返回数据
    return response.data;
  }
  let errorInfo = "";
  switch (status) {
    case -1:
      errorInfo = "远程服务响应失败,请稍后重试";
      break;
    case 400:
      errorInfo = "400：错误请求";
      break;
    case 401:
      errorInfo = "401：访问令牌无效或已过期";
      break;
    case 403:
      errorInfo = "403：拒绝访问";
      break;
    case 404:
      errorInfo = "404：资源不存在";
      break;
    case 405:
      errorInfo = "405：请求方法未允许";
      break;
    case 408:
      errorInfo = "408：请求超时";
      break;
    case 500:
      errorInfo = "500：访问服务失败";
      break;
    case 501:
      errorInfo = "501：未实现";
      break;
    case 502:
      errorInfo = "502：无效网关";
      break;
    case 503:
      errorInfo = "503：服务不可用";
      break;
    default:
      errorInfo = `连接错误`;
  }

  return {
    status,
    msg: errorInfo
  };
};

export default Axios;
