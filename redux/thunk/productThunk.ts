import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axiosInstance";

export const getAllProductApi = createAsyncThunk(
    "getAllProductApi",
    async () => {
        try {
            const result = await axiosInstance.get("Product")
            return result.data.content
        } catch (err) {
            console.log(err)
            return []
        }
    }
)