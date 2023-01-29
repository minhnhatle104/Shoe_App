import { createSlice } from '@reduxjs/toolkit'
import { getLoginApi, getRegisterApi } from '../thunk/accountThunk';

export interface AccountLoginModel {
    email: string;
    password: string;
}

export interface AccountRegisterModel {
    email: string;
    password: string;
    name: string;
    gender: boolean;
    phone: string;
}

interface AccountModel {
    accessToken: string;
    isLogin: boolean;
    popUpNotification: boolean;
    statusRegister:boolean;
}

const initialState: AccountModel = {
    accessToken: "",
    isLogin: false,
    popUpNotification: false,
    statusRegister:false,
}

const accountSlice = createSlice({
    name: "accountSlice",
    initialState,
    reducers: {
        closeNotificationLogin: (state) => {
            state.popUpNotification = false
        },
        closeNotificationRegister:(state)=>{
            state.popUpNotification = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getLoginApi.pending, (state, action) => {

        }).addCase(getLoginApi.fulfilled, (state, action) => {
                state.accessToken = action.payload
                if (action.payload !== "") {
                    state.isLogin = true
                } else {
                    state.popUpNotification = true
                }
        }).addCase(getRegisterApi.pending,(state,action)=>{

        }).addCase(getRegisterApi.fulfilled,(state,action)=>{
            state.statusRegister = action.payload
            state.popUpNotification = true
        })
    }
});

export const { closeNotificationLogin,closeNotificationRegister, } = accountSlice.actions

export default accountSlice.reducer