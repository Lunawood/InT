import axios from "axios";
// axios 인스턴스 생성
const instance = axios.create({
  baseURL: "",
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    // 헤더에 엑세스 토큰 담기
    const accessToken = localStorage.getItem("accessToken");
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
