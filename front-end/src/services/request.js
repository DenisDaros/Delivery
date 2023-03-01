import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

const requestLogin = async (endpoint, body) => {
  console.log('chamou');
  const { data } = await api.post(endpoint, body);
  return data;
};

export default {
  setToken,
  requestData,
  requestLogin,
};
