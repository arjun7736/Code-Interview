import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://code-interview.onrender.com',
});

export default axiosInstance;
