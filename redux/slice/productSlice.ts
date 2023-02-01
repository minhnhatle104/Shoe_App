import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash';
import { getAllProductApi, getProductByCategoryIdApi, getProductByIdApi, getProductLikeApi, orderProductApi, postProductLikeApi, postProductUnlikeApi, } from '../thunk/productThunk';

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

export interface ProductLikeModel {
    id:    number;
    name:  string;
    image: string;
}

export type ProductState = {
    defaultShoeList: ProductModel[] | undefined | null
    shoeList: ProductModel[] | undefined | null
    productDetail: ShoeDetailModel | undefined | null
    shoeFavourite:ProductLikeModel[] | undefined | null
    shoeCart:any[]
    statusOrder:boolean
    popUpNotificationOrder:boolean
}

const initialState:ProductState = {
    defaultShoeList : null,
    shoeList: null,
    productDetail: null,
    shoeFavourite:null,
    shoeCart:[],
    statusOrder:false,
    popUpNotificationOrder:false,
}

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        searchShoe:(state,action)=>{
            let textSearch:string = action.payload
            console.log(textSearch)
            if(textSearch === ""){
                state.shoeList = state.defaultShoeList
            }else{
                state.shoeList = state.shoeList ? state.shoeList.filter(item => item.name.trim().toLowerCase()
                .includes(textSearch.trim().toLowerCase())) 
                : state.shoeList
            }
        },
        addToCart:(state,action)=>{
            let shoeId = action.payload
            // Kiểm tra shoeCart có phải là mảng rỗng
            if(_.isEmpty(state.shoeCart)){
                const newShoe = {
                    productId: shoeId,
                    quantity:1
                }
                state.shoeCart.push(newShoe)
            }else{
                const index = state.shoeCart.findIndex(item => item.productId === shoeId)
                // Trường hợp shoe có trong cart rồi
                if(index !== -1){
                    state.shoeCart[index].quantity +=1
                }else{
                    const newShoe = {
                        productId: shoeId,
                        quantity:1
                    }
                    state.shoeCart.push(newShoe)
                }
            }
        },
        deleteFromCart:(state,action)=>{
            let shoeId = action.payload
            const index = state.shoeCart.findIndex(item => item.productId === shoeId)
            if(index!==-1){
                state.shoeCart[index].quantity -=1
                // Trường hợp trừ số lượng xong = 0
                if(state.shoeCart[index].quantity === 0){
                    state.shoeCart.splice(index, 1)
                }
            }
        },
        deleteAllCart:(state)=>{
            state.shoeCart = []
        },
        closeNotificationOrder:(state)=>{
            state.popUpNotificationOrder = false
        },
        closeStatusOrder:(state)=>{
            state.statusOrder = false
        },
        deleteOneItemCart:(state,action)=>{
            let shoeId = action.payload
            const index = state.shoeCart.findIndex(item => item.productId === shoeId)
            if(index!==-1){
                // Tìm thấy sản phẩm trong giỏ hàng --> delete
                state.shoeCart.splice(index,1)
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
        }).addCase(getProductLikeApi.pending,(state,action)=>{

        }).addCase(getProductLikeApi.fulfilled,(state,action)=>{
            state.shoeFavourite = action.payload
        }).addCase(postProductLikeApi.pending,(state,action)=>{

        }).addCase(postProductLikeApi.fulfilled,(state,action)=>{
            
        }).addCase(postProductUnlikeApi.pending,(state,action)=>{
            
        }).addCase(postProductUnlikeApi.fulfilled,(state,action)=>{
            
        }).addCase(orderProductApi.pending,(state,action)=>{
            
        }).addCase(orderProductApi.fulfilled,(state,action)=>{
            if(action.payload){
                state.statusOrder = true
                state.popUpNotificationOrder = true
                state.shoeCart = []
            }else{
                state.statusOrder = false
                state.popUpNotificationOrder = true
            }
        })
    },
});

export const {
    searchShoe,
    addToCart,
    deleteFromCart,
    deleteAllCart,
    closeNotificationOrder,
    closeStatusOrder,
    deleteOneItemCart
 } = productSlice.actions

export default productSlice.reducer