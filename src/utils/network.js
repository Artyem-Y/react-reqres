import axios from 'axios';
import endpoint from '../config';

export async function get(url, params, headerParams) {
  const token = localStorage.getItem('token');
  const response = await axios.get(url, {
    params,
    headers: {
      proxyAuthorization: token,
      ...headerParams,
    },
  });

  return response.data;
}

export async function post(url, data, params) {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${endpoint.api}/${url}`, data, {
    headers: {
      proxyAuthorization: token,
    },
    params
  });

  return response.data;
}
