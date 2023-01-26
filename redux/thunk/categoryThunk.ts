import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axiosInstance";
import STATUS_CODE from "../../common/StatusCode";
import { closeLoading, openLoading } from "../slice/loadingSlice";

export const getAllCategoryApi = createAsyncThunk(
    "shoe/categoryApi",
    async (_,thunkAPI) => {
        try {
            thunkAPI.dispatch(openLoading())
            const result = await axiosInstance.get("Product/getAllCategory")
            thunkAPI.dispatch(closeLoading())
            return result.data.content
        } catch (err) {
            console.log(err)
            thunkAPI.dispatch(closeLoading())
        }
    }
)