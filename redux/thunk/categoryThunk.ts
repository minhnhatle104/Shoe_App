import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axiosInstance";
import STATUS_CODE from "../../common/StatusCode";

export const getAllCategoryApi = createAsyncThunk(
    "shoe/categoryApi",
    async () => {
        try {
            const result = await axiosInstance.get("Product/getAllCategory")
            return result.data.content
        } catch (err) {
            console.log(err)
        }
    }
)