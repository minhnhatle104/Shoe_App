import { createSlice } from '@reduxjs/toolkit'
import { changePasswordApi, getLoginApi, getProfileApi, getRegisterApi, updateProfileApi } from '../thunk/accountThunk';

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

export interface AccountUpdateModel {
    email: string;
    password: string;
    name: string;
    gender: boolean;
    phone: string;
}


export interface GetProfileModel {
    ordersHistory: any[];
    email:         string;
    name:          string;
    password:      null;
    gender:        boolean;
    phone:         string;
    facebookId:    string;
    deleted:       boolean;
    avatar:        string;
}

interface AccountModel {
    accessToken: string;
    isLogin: boolean;
    popUpNotification: boolean;
    statusRegister:boolean;
    statusUpdateProfile:boolean;
    statusChangePassword:boolean;
    infoProfile: GetProfileModel | any
}

const initialState: AccountModel = {
    accessToken: "",
    isLogin: false,
    popUpNotification: false,
    statusRegister:false,
    statusUpdateProfile:false,
    statusChangePassword:false,
    infoProfile:{},
}

const accountSlice = createSlice({
    name: "accountSlice",
    initialState,
    reducers: {
        closeNotificationLogin: (state) => {
            state.popUpNotification = false
        },
        closeStatusLogin:(state)=>{
            state.isLogin = false
        },
        closeNotificationRegister:(state)=>{
            state.popUpNotification = false
        },
        closeStatusRegister:(state)=>{
            state.statusRegister = false
        },
        closeNotificationUpdate:(state)=>{
            state.popUpNotification = false
        },
        closeStatusUpdateProfile:(state)=>{
            state.statusUpdateProfile = false
        },
        closeStatusChangePassword:(state)=>{
            state.statusChangePassword = false
        }, 
        closeNotificationChangePass:(state)=>{
            state.popUpNotification = false
        },
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
        }).addCase(getProfileApi.pending,(state,action)=>{
            
        }).addCase(getProfileApi.fulfilled,(state,action)=>{
            state.infoProfile = action.payload
        }).addCase(updateProfileApi.pending,(state,action)=>{

        }).addCase(updateProfileApi.fulfilled,(state,action)=>{
            state.statusUpdateProfile = action.payload
            state.popUpNotification = true
        }).addCase(changePasswordApi.pending,(state,action)=>{

        }).addCase(changePasswordApi.fulfilled,(state,action)=>{
            state.statusChangePassword = true
        })
    }
});

export const { 
    closeNotificationLogin,
    closeNotificationRegister,
    closeNotificationUpdate,
    closeStatusUpdateProfile,
    closeStatusRegister,
    closeStatusChangePassword,
    closeNotificationChangePass,
    closeStatusLogin
 } = accountSlice.actions

export default accountSlice.reducer