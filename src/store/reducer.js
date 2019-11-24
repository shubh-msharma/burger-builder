import * as actionType from './action'

const initState = {
    ingredients: {
        salad: 0,
        meat: 0,
        bacon: 0,
        cheese: 0
    },
    price: 100
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
                price:state.price + INGREDIENT_PRICE[action.ingredient]
            }

        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] - 1
                },
                price:state.price - INGREDIENT_PRICE[action.ingredient]
            }

        default:
            return state
    }
}

export default reducer