import axios from "axios"
import LocalStorage from "./local_storage/localStorage"


export const axiosInstance = axios.create({
    baseURL:"https://shop.cyberlearn.vn/api/",
    timeout: 1000,
    headers:{
        "Authorization":"Bearer "+ LocalStorage.getStorage("login-token")
    }
})