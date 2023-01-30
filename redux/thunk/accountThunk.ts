import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axiosInstance";
import { AccountLoginModel, AccountRegisterModel } from "../slice/accountSlice";
import { closeLoading, openLoading } from "../slice/loadingSlice";
import localStorage from "../../local_storage/localStorage";

export const getLoginApi = createAsyncThunk(
    "shoe/signinApi",
    async (infoLogin:AccountLoginModel,thunkAPI) => {
        try {
            thunkAPI.dispatch(openLoading())
            const result = await axiosInstance.post("Users/signin",infoLogin)
            thunkAPI.dispatch(closeLoading())
            localStorage.saveStorage("login-token",result.data.content.accessToken)
            return result.data.content.accessToken
        } catch (err) {
            console.log("ERROR in login is:",err)
            thunkAPI.dispatch(closeLoading())
            return ""
        }
    }
)

export const getRegisterApi = createAsyncThunk(
    "shoe/registerApi",
    async (infoRegister:AccountRegisterModel,thunkAPI) => {
        try {
            thunkAPI.dispatch(openLoading())
            const result = await axiosInstance.post("Users/signup",infoRegister)
            thunkAPI.dispatch(closeLoading())
            return true
        } catch (err) {
            console.log(err)
            thunkAPI.dispatch(closeLoading())
            return false
        }
    }
)