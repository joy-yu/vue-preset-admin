import axios from 'axios';

let base = '/api/v1/users';

const user = {
  getList: params => axios.get(`${base}`, { params: params }),
  delete: id => axios.delete(`${base}/${id}`),
  add: params => axios.post(`${base}`, params),
  update: params => axios.put(`${base}/${params.id}`, params),

  updatePwd: params => axios.put(`/api/v1/users_b/pwd/${params.id}`, params)
};

export default user;
