import axios, { AxiosInstance } from "axios";
import { BACKEND_URL } from "../utils/constants";

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

const api: AxiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error("Axios error:", error);
    return Promise.reject(error);
  }
);

export default api;
