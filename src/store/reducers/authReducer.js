import * as actionTypes from '../actions/actionTypes'
import {updateState} from '../utility'

const initialState = {
    token: null,
    userId: null,
    loading: false,
    error: null,
}

const authStart = (state,action)=>{
    return updateState(state,{loading:true,error:null})
}

const authSuccess = (state,action) =>{
    return updateState(state,{
        token:action.idToken,
        userId:action.userId,
        loading:false,
        error:null
    })
}

const authfail = (state,action) =>{
    return updateState(state,{
        loading:false,
        error:action.error
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state,action)
            
        case actionTypes.AUTH_SUCCESS: return authSuccess(state,action)

        case actionTypes.AUTH_FAIL: return authfail(state,action)

        default:return state
    }
}

export default reducer