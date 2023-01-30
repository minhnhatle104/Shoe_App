import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "../../axiosInstance";
import localStorage from "../../local_storage/localStorage";
import { closeLoading, openLoading } from "../slice/loadingSlice";

export const getAllProductApi = createAsyncThunk(
    "shoe/getAllProductApi",
    async (_,thunkAPI) => {
        try {
            thunkAPI.dispatch(openLoading())
            const result = await axiosInstance.get("Product")
            thunkAPI.dispatch(closeLoading())
            return result.data.content
        } catch (err) {
            console.log(err)
            thunkAPI.dispatch(closeLoading())
            return []
        }
    }
)


export const getProductByCategoryIdApi = createAsyncThunk(
    "shoe/productByCategoryId",
    async (categoryId: string,thunkAPI) => {
        try {
            thunkAPI.dispatch(openLoading())
            const result = await axiosInstance.get(`Product/getProductByCategory?categoryId=${categoryId}`)
            thunkAPI.dispatch(closeLoading())
            return result.data.content
        } catch (err) {
            thunkAPI.dispatch(closeLoading())
            console.log(err)
        }
    }
)

export const getProductByIdApi = createAsyncThunk(
    "shoe/productById",
    async (productId: number,thunkAPI) => {
        try {
            thunkAPI.dispatch(openLoading())
            const result = await axiosInstance.get(`Product/getbyid?id=${productId}`)
            thunkAPI.dispatch(closeLoading())
            return result.data.content
        } catch (err) {
            thunkAPI.dispatch(closeLoading())
            console.log(err)
        }
    }
)

export const getProductLikeApi = createAsyncThunk(
    "shoe/productLike",
    async () => {
        try {
            const result =await axiosInstance.get("Users/getproductfavorite")
            return result.data.content.productsFavorite
        } catch (err) {
            console.log("ERROR in get like is: ",err)
        }
    }
)