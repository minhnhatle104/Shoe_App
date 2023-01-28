import { createSlice } from '@reduxjs/toolkit'
import { getAllProductApi, getProductByCategoryIdApi, getProductByIdApi, } from '../thunk/productThunk';

export interface ProductModel {
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

export interface ShoeDetailModel {
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
    categories:       CategoryModel[];
    relatedProducts:  RelatedProductModel[];
}

interface CategoryModel {
    id:       string;
    category: string;
}

export interface RelatedProductModel {
    id:               number;
    name:             string;
    alias:            string;
    feature:          boolean;
    price:            number;
    description:      string;
    shortDescription: string;
    image:            string;
}

export type ProductState = {
    defaultShoeList: ProductModel[] | undefined | null
    shoeList: ProductModel[] | undefined | null
    productDetail: ShoeDetailModel | undefined | null
}

const initialState:ProductState = {
    defaultShoeList : null,
    shoeList: null,
    productDetail: null
}

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        searchShoe:(state,action)=>{
            let textSearch:string = action.payload
            if(textSearch === ""){
                state.shoeList = state.defaultShoeList
            }else{
                state.shoeList = state.shoeList ? state.shoeList.filter(item => item.name.trim().toLowerCase()
                .includes(textSearch.trim().toLowerCase())) 
                : state.shoeList
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(getAllProductApi.pending, (state, action) => {

        }).addCase(getAllProductApi.fulfilled, (state, action) => {
            state.defaultShoeList = action.payload
            state.shoeList = action.payload
        }).addCase(getProductByCategoryIdApi.pending,(state,action)=>{

        }).addCase(getProductByCategoryIdApi.fulfilled,(state,action)=>{
            state.defaultShoeList = action.payload
            state.shoeList = action.payload
        }).addCase(getProductByIdApi.pending,(state,action)=>{

        }).addCase(getProductByIdApi.fulfilled,(state,action)=>{
            state.productDetail = action.payload
        })
    },
});

export const {searchShoe, } = productSlice.actions

export default productSlice.reducer