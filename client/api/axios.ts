import axios, { AxiosError } from "axios";

export interface Response<T> {
  success: boolean;
  data?: T;
  message?: string;
}

const axiosInstance = axios.create({
  baseURL: 'api',
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: unknown) => Promise.reject(({
    success: false,
    message: error instanceof AxiosError ? error.response?.data.message : '오류가 발생했습니다',
  })),
);

export default axiosInstance;
