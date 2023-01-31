import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axiosInstance";
import { AccountLoginModel, AccountRegisterModel, AccountUpdateModel } from "../slice/accountSlice";
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

export const getProfileApi = createAsyncThunk(
    "shoe/getProfileApi",
    async () => {
        try {
            const result = await axiosInstance.post("Users/getProfile")
            return result.data.content
        } catch (err) {
            console.log(err)
        }
    }
)

export const updateProfileApi = createAsyncThunk(
    "shoe/updateProfileApi",
    async (infoUpdate:AccountUpdateModel,thunkAPI) => {
        try {
            thunkAPI.dispatch(openLoading())
            const result = await axiosInstance.post("Users/updateProfile",infoUpdate)
            thunkAPI.dispatch(closeLoading())
            thunkAPI.dispatch(getProfileApi())
            return true
        } catch (err) {
            console.log("ERROR in update profile is: ",err)
            thunkAPI.dispatch(closeLoading())
            return false
        }
    }
)

export const changePasswordApi = createAsyncThunk(
    "shoe/changePasswordApi",
    async (infoNewPass:any,thunkAPI) => {
        try {
            thunkAPI.dispatch(openLoading())
            const result = await axiosInstance.post("Users/changePassword",infoNewPass)
            thunkAPI.dispatch(closeLoading())
            thunkAPI.dispatch(getProfileApi())
            return true
        } catch (err) {
            console.log("ERROR in update profile is: ",err)
            thunkAPI.dispatch(closeLoading())
            return false
        }
    }
)