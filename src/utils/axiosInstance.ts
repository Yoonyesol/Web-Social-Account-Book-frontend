import axios from "axios";
import { store } from "../modules/store";

const clientConfig = { baseURL: process.env.REACT_APP_BACKEND_URL };

export const publicApiClient = axios.create(clientConfig);
const apiClient = axios.create(clientConfig);

// 요청 인터셉터: Redux 스토어에 토큰이 있으면 자동으로 Authorization 헤더 주입
apiClient.interceptors.request.use(
  (config) => {
    const token = store.getState().user.token;
    if (token && !config.headers?.Authorization) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default apiClient;
