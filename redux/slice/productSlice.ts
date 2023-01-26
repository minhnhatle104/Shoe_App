import { createSlice } from '@reduxjs/toolkit'
import { getAllProductApi, getProductByCategoryIdApi } from '../thunk/productThunk';

export interface Product {
    id: number;
    name: string;
    alias: string;
    price: number;
    description: string;
    size: string;
    shortDescription: string;
    quantity: number;
    deleted: boolean;
    categories: string;
    relatedProducts: string;
    feature: boolean;
    image: string;
}

export type ProductState = {
    shoeList: Product[] | null
}

const initialState = {
    shoeList: null,
}

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllProductApi.pending, (state, action) => {

        }).addCase(getAllProductApi.fulfilled, (state, action) => {
            state.shoeList = action.payload
        }).addCase(getProductByCategoryIdApi.pending,(state,action)=>{

        }).addCase(getProductByCategoryIdApi.fulfilled,(state,action)=>{
            state.shoeList = action.payload
        })
    },
});

export const { } = productSlice.actions

export default productSlice.reducer