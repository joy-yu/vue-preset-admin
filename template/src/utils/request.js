import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';

const black_list = [];

axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.timeout = 15000;

// 请求拦截
axios.interceptors.request.use(cfg => {
  cfg.headers.Authorization = localStorage.getItem('token');
  cfg.data = qs.stringify(cfg.data);
  return cfg;
});

// 响应拦截
axios.interceptors.response.use(
  res => {
    console.log('响应:', res.config.url, res);
    if (res.data && res.data.code !== 0 && res.data.msg && black_list.indexOf(res.config.url) === -1) {
      Message.error(res.data.msg);
    }
    return res.data;
  },
  err => {
    console.log('请求报错:', err.config.method, err.config.url, err.config.data);
    if (err.code === 'ECONNABORTED') {
      Message.error('请求超时！请检查网络设置！');
    }
    console.log(err.response);
    if (err.response) {
      switch (err.response.status) {
        case 401:
          // Message.error('没有权限！')
          break;
        case 500:
          // Message.error('请求异常，如有使用问题请及时联系管理员');
          break;
      }
    }
    return Promise.reject(err);
  }
);

export default axios;
