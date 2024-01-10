import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "../features/Layout/layoutSlice";

export const store = configureStore({
    reducer: layoutReducer
})