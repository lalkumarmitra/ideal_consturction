import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { authenticate } from "../features/Auth/authSlice";
import { setPreloader } from "../features/Ui/uiSlice";
import Preloader from "../components/Preloader";

const validate =  (dispatch,authenticate,setPreloader) => {
    const t = localStorage.getItem('_token');
    if(t){
        axios({ 
            url: "https://api.idealconstruction.online/api/validate", 
            method: "GET",
            headers: { Accept: "application/json", Authorization: 'Bearer '+t },
        })
        .then(r=>{
            dispatch(setPreloader({loader:false,message:''}))
            dispatch(authenticate({
                _token:t,
                _user:r.data.data.user,
            }));
        })
        .catch(e=>{
            localStorage.removeItem('_token');
            dispatch(setPreloader({loader:false,message:''}))
            dispatch(authenticate({_token:null,_user:{}}))
        })
    }else {
        dispatch(setPreloader({loader:false,message:''}))
        dispatch(authenticate({_token:null,_user:{}}))
    }
}

export const AuthMiddleWare = props =>{
    const dispatch = useDispatch()
    const auth = useSelector(state=>state.auth)
    useEffect(()=>{
        validate(dispatch,authenticate,setPreloader);
    },[])
    if(auth._token === false )
    return (<Preloader title='Authenticating Please Wait ...' />)
    return auth._token && (props.users.indexOf(auth._roleType)>=0) ? (<>{props.children}</>) : (<Navigate to={{pathname:'/login', state: { from: props.location }}} />)
}
export const GuestMiddleware = props =>{
    const dispatch = useDispatch()
    const auth = useSelector(state=>state.auth)
    useEffect(()=>{
        dispatch(setPreloader({loader:true,message:'Authenticating Please Wait ...'}))
        validate(dispatch,authenticate,setPreloader);
    },[])
    return auth._token ? (<Navigate to={{pathname:'/dashboard',state: { from: props.location }}} />) : (<>{props.children}</>)
}