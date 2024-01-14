import { createSlice } from "@reduxjs/toolkit";

const initialState = {_token:false,_user:{},_role:null,_roleType:null}
const AuthSlice = createSlice({
    name: "Auth",
    initialState,
    reducers:{
        authenticate : (state,action)=>{
            //validate the token 
            state._token = action.payload._token
            state._user = action.payload._user
            state._role = state._user.role?state._user.role.id:null
            state._roleType = state._user.role?state._user.role.type:null
        }
    }
});

export const { authenticate } = AuthSlice.actions;
export default AuthSlice.reducer;