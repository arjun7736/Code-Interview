import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://judge0-ce.p.rapidapi.com/", 
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};

    config.headers['X-RapidAPI-Key'] = '655859ea4amsh937ba3b55af8712p1e042ejsna7bf1ca728de';
    config.headers['X-RapidAPI-Host'] = 'judge0-ce.p.rapidapi.com';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
