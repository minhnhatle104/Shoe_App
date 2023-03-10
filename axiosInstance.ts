import axios from "axios"
import localStorage from "./local_storage/localStorage"

export const axiosInstance = axios.create({
    baseURL:"https://shop.cyberlearn.vn/api/",
})

// Cấu hình cho tất cả request gửi đi
// http.interceptors.request
axiosInstance.interceptors.request.use(
    async (config) => {
        let accessToken = await localStorage.getStorage("login-token");
        config.headers["Authorization"] = `Bearer ${accessToken}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);