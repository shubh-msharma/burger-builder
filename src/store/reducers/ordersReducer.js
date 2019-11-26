import * as actionTypes from '../actions/actionTypes'

const initialState = {
    oders:[],
    loadindDataToServer:false,
    purchased:false,
    gettingOrdersFromServer:true
}

const reducer = (state=initialState , action)=>{
    switch (action.type) {
        case actionTypes.PURCHASED:
            return {
                ...state,
                purchased:false
            }
        case actionTypes.PURCHASE_BURGER_STARTS:
            return {
                ...state,
                loadindDataToServer:true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return{
                ...state,
                oders:state.oders.concat({id:action.id,oder:action.orderData}),
                loadindDataToServer:false,
                purchased:true
            }
        case actionTypes.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                loadindDataToServer:false,
                purchased:true
            }
        case actionTypes.FETCH_ORDER_START:
            return {
                ...state,
                gettingOrdersFromServer:true
            }
        case actionTypes.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                oders:action.oders,
                gettingOrdersFromServer:false 
            }
        case actionTypes.FETCH_ORDER_FAIL:
            return{
                ...state,
                gettingOrdersFromServer:false
            }
        default:
            return state
    }
}

export default reducer