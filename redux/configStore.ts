import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slice/categorySlice";
import loadingSlice from "./slice/loadingSlice";
import productSlice from "./slice/productSlice";

export const store = configureStore({
    reducer: {
        categorySlice,
        productSlice,
        loadingSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch