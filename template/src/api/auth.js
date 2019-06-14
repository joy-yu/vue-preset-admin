import axios from 'axios';

const base = '/api/v1';

export default {
  requestLogin: params => axios.post(`${base}/loginPWD`, params),
  requestLogout: params => axios.post(`${base}/logout`, params),
  loginStatus: params => axios.get(`${base}/user/log_status`, { params: params })
};
