import { createSlice } from '@reduxjs/toolkit'
import { getAllCategoryApi } from '../thunk/categoryThunk';

export interface Category {
  id: string;
  category: string;
  categoryParent: string;
  categoryChild: string;
  deleted: boolean;
  productList: string;
  alias: string;
}

export type CategoryState = {
  categoryList: Category[] | undefined | null
}


const initialState = {
  categoryList: null
}

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(getAllCategoryApi.pending, (state, action) => {

    }).addCase(getAllCategoryApi.fulfilled, (state, action) => {
      let categoryList = action.payload
      categoryList.unshift({
        id: "ALL",
        category: "ALL",
        categoryParent: "",
        categoryChild: "",
        deleted: false,
        productList: "",
        alias: "",
      })
      action.payload = categoryList
      state.categoryList = action.payload
    })
  }
});

export const { } = categorySlice.actions

export default categorySlice.reducer