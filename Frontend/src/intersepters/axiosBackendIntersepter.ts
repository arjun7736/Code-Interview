import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://code-interview-production.up.railway.app',
});

export default axiosInstance;
