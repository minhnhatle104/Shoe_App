import axios from "axios"
import localStorage from "./local_storage/localStorage"

const accessToken = localStorage.getStorage("login-token")

export const axiosInstance = axios.create({
    baseURL:"https://shop.cyberlearn.vn/api/",
    timeout: 1000,
    headers:{
        "Authorization":"Bearer "+ accessToken
    }
})