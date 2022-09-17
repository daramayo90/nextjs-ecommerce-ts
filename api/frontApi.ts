import axios from 'axios';

const frontApi = axios.create({
  baseURL: '/api',
});

export default frontApi;
