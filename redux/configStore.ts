import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slice/categorySlice";

export const store = configureStore({
    reducer:{
        categorySlice,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch