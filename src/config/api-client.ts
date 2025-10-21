import axios from 'axios';

const apiClient = axios.create({
   baseURL:
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8080/api"
      : "https://umkm-api-41129800449.asia-southeast1.run.app/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401){
      console.warn("Unauthorized, please login again");
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default apiClient;