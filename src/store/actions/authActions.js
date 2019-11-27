


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
                dispatch(authSuccess(res.data.idToken,res.data.localId))
            })
            .catch(error => {
                console.log(error)
                dispatch(authFail(error))
            })
    }
}