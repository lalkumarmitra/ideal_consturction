import { combineReducers, configureStore } from "@reduxjs/toolkit";
import layoutReducer from "../features/Layout/layoutSlice";
import AuthReducer from "../features/Auth/authSlice";
import UiReducer from "../features/Ui/uiSlice";

const rootReducer = combineReducers({
    layout:layoutReducer,
    auth:AuthReducer,
    ui:UiReducer
})
export const store = configureStore({
    reducer: rootReducer
})