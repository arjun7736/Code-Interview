import axios, { InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:2358", 
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }
    
    (config.headers as AxiosHeaders).set('X-Auth-Token',import.meta.env.VITE_X_TOKEN );
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
