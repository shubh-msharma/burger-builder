


import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authSuccess = (token,userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error:error
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const logOutUser = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkTokenTimeOut = (tokenTime)=>{
    return dispatch=>{
    setTimeout(()=>{
        dispatch(logOutUser())
    },tokenTime*1000)}
}

export const authenticate = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = ""
        if (isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTnaXRoYizx6p-wxGCrV_-su2BjHLpslU"

        } else {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTnaXRoYizx6p-wxGCrV_-su2BjHLpslU"

        }
        console.log(authData)
        axios.post(url, authData)
            .then(res => {
                console.log(res)
                const expirationTime = new Date(new Date().getTime() + res.data.expiresIn*1000)
                console.log(expirationTime);
                localStorage.setItem('token',res.data.idToken);
                localStorage.setItem('expirationTime',expirationTime)
                localStorage.setItem('userId',res.data.localId)
                dispatch(authSuccess(res.data.idToken,res.data.localId))
                dispatch(checkTokenTimeOut(res.data.expiresIn));
            })
            .catch(error => {
                console.log(error)
                dispatch(authFail(error))
            })
    }
}


export const setAuthRedirectPath = (path)=>{
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const checkAuthStatus = ()=>{
    return dispatch=>{
        const token = localStorage.getItem('token');
        const expirationTime = new Date(localStorage.getItem("expirationTime"));
        const userId = localStorage.getItem('userId')
        if(!token){
            dispatch(logOutUser());
        }else{
            if(expirationTime > new Date()){
                dispatch(authSuccess(token,userId));
                dispatch(checkTokenTimeOut((expirationTime.getTime()-new Date().getTime())/1000))
            }else{
                dispatch(logOutUser());
            }
        }
    }
}