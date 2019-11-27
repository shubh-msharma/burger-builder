import * as actionTypes from '../actions/actionTypes'
import axios from 'axios'




export const addIngredients = (ingType) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredient: ingType
    }
}

export const removeIngredients = (ingType) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient: ingType
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientFailed = ()=>{
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get("https://burgerbuilder-103ca.firebaseio.com/ingredients.json")
            .then(res => {
                    dispatch(setIngredients(res.data))
                
            }).catch(error=>{
                dispatch(fetchIngredientFailed())
            })
    }
}

