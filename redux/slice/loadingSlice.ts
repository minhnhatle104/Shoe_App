import { createSlice } from '@reduxjs/toolkit'

interface TypeLoading {
    isLoading:boolean
}

const initialState:TypeLoading = {
    isLoading:false,
}

const loadingSlice = createSlice({
  name: "Loading",
  initialState,
  reducers: {
    openLoading:(state)=>{
        state.isLoading = true
    },
    closeLoading:(state)=>{
        state.isLoading = false
    }
  }
});

export const {openLoading,closeLoading} = loadingSlice.actions

export default loadingSlice.reducer