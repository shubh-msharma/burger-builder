import * as actionType from '../actions/actionTypes'

const initState = {
    ingredients: null,
    price: 100,
    error: false
}

const INGREDIENT_PRICE = {
    salad: 15,
    bacon: 20,
    cheese: 25,
    meat: 35
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] + 1
                },
                price: state.price + INGREDIENT_PRICE[action.ingredient]
            }

        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] - 1
                },
                price: state.price - INGREDIENT_PRICE[action.ingredient]
            }
        case actionType.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                price: 100,
                error: false
            }
        case actionType.FETCH_INGREDIENTS_FAILED :
            return{
                ...state,
                error:true
            }

        default:
            return state
    }
}

export default reducer