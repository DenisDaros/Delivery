import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);

  return data;
};

const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);

  return data;
};

const requestLoginManager = async (endpoint, body, token) => {
  const { data } = await api.post(endpoint, body, {
    headers: { Authorization: token } });

  return data;
};

export default {
  setToken,
  requestData,
  requestLogin,
  requestLoginManager,
};
