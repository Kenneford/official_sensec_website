// src/api.js
import axios from "axios";
import { SENSEC_API_ENDPOINT } from "./api";

// Create an Axios instance
const tokenInterceptor = axios.create({
  baseURL: SENSEC_API_ENDPOINT,
});

// Request interceptor to attach token from Redux state
tokenInterceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(new Error(error))
);

export default tokenInterceptor;
