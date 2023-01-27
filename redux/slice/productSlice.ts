import { createSlice } from '@reduxjs/toolkit'
import { getAllProductApi, getProductByCategoryIdApi, getProductByIdApi } from '../thunk/productThunk';

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
    shoeList: Product[] | undefined| null
}

export interface ShoeDetail {
    id:               number;
    name:             string;
    alias:            string;
    price:            number;
    feature:          boolean;
    description:      string;
    size:             string[];
    shortDescription: string;
    quantity:         number;
    image:            string;
    categories:       Category[];
    relatedProducts:  RelatedProduct[];
}

interface Category {
    id:       string;
    category: string;
}

export interface RelatedProduct {
    id:               number;
    name:             string;
    alias:            string;
    feature:          boolean;
    price:            number;
    description:      string;
    shortDescription: string;
    image:            string;
}

export type ProductDetail = {
    productDetail: ShoeDetail | undefined | null
}

const initialState = {
    shoeList: null,
    productDetail: null
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
        }).addCase(getProductByIdApi.pending,(state,action)=>{

        }).addCase(getProductByIdApi.fulfilled,(state,action)=>{
            state.productDetail = action.payload
        })
    },
});

export const { } = productSlice.actions

export default productSlice.reducer