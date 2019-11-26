import * as actionTypes from './actionTypes'
import axios from 'axios'




export const purchaseBurgerSuccess = (id,orderData) =>{
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        id:id,
        orderData:orderData
    }
}

export const purchaseBurgerFailed = (error)=>{
    return {
        type:actionTypes.PURCHASE_BURGER_FAILED,
        error:error
    }
}

export const purchaseBurgerStart = () =>{
    return {
        type:actionTypes.PURCHASE_BURGER_STARTS
    }
}

export const purchaseBurger = (orderData)=>{
    return dispatch=>{
            dispatch(purchaseBurgerStart())
            axios.post("https://burgerbuilder-103ca.firebaseio.com/order.json", orderData)
                .then(res=>{
                    dispatch(purchaseBurgerSuccess(res.data.name,orderData))
                }).catch(error=>{
                    dispatch(purchaseBurgerFailed(error))
                })
            
            
    }
}

export const purchased = ()=>{
    return {
        type:actionTypes.PURCHASED
    }
}


export const fetchOrderStart = ()=>{
    return {
        type:actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrderSuccess = (oders)=>{
    return {
        type:actionTypes.FETCH_ORDER_SUCCESS,
        oders:oders
    }
}

export const fetchOrderFail = (error)=>{
    return {
        type:actionTypes.FETCH_ORDER_FAIL,
        error:error
    }
}

export const fetchOders = ()=>{
    return dispatch=>{
        axios.get('https://burgerbuilder-103ca.firebaseio.com/order.json')
            .then(orders=>{
                const fetchedOrders = []
                for(let key in orders.data){
                    fetchedOrders.push({
                        ...orders.data[key],
                        key
                    })
                }
                dispatch(fetchOrderSuccess(fetchedOrders))
            }).catch(err=>{
                dispatch(fetchOrderFail(err));
            })
    }
}

