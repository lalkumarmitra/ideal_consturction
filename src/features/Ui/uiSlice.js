import { createSlice } from "@reduxjs/toolkit";

const initialState = {loader:false,message:''}
const UiSlice = createSlice({
    name: "Ui",
    initialState,
    reducers:{
        setPreloader : (state,action)=>{
            state.loader  = action.payload.loader;
            state.message = action.payload.message;
        },
    }
});

export const { setPreloader } = UiSlice.actions;
export default UiSlice.reducer;