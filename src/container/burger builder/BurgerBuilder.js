import React, { Component } from 'react'
import Aux from "../../hoc/wrapper"
import Burger from '../../components/burger/Burger'
import BuildControls from '../../components/burger/burger building controls/buildControls'
import Modal from '../../components/UI/modal/modal'
import OrderSummary from '../../components/burger/order summary/orderSummary'
import axios from 'axios'
import Spinner from '../../components/UI/spinner/spinner'
import ErrorHandlerComp from '../../hoc/errorHandlerComponent/errorHandlerComp'
import { connect } from 'react-redux'
import * as actionType from '../../store/action'


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loadindDataToServer: false,
        error: false
    }

    // // life cycle hooks

    // componentDidMount() {
    //     axios.get("https://burgerbuilder-103ca.firebaseio.com/ingredients.json")
    //         .then(res => {
    //             if (res) {
    //                 this.setState({
    //                     ingredients: res.data
    //                 })
    //             }
    //             else {
    //                 this.setState({ error: true })
    //             }
    //         })
    // }


    

    // handler for adding removing modal by changinging value of <purchasing>
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }
    closeModalHandler = () => {
        this.setState({ purchasing: false, error: false })
    }

    continuePurchaseHandler = async () => {
        
        this.props.history.push('/checkout');
    }

    render() {
        // build Control me less button ko disable krene k liye info
        const shouldButtonDisable = {
            ...this.props.ingredients
        }
        for (let key in shouldButtonDisable) {
            shouldButtonDisable[key] = shouldButtonDisable[key] <= 0
        }
        // order button ko enblse disable krene k liye
        const shouldOrderButtonDisable = !Object.values(shouldButtonDisable).includes(false);
        // ******itta hi tha button ko disable krne ka array dene wala code******

        let burger = this.state.error ? <Modal showModal={this.state.error} backdropClicked={this.closeModalHandler}>ingredients cannot be loaded</Modal> : <Spinner />;
        let contentOfModal = null;
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    {/* burger dikhane k liye */}
                    <Burger ingredients={this.props.ingredients} />

                    {/* controls zyadater isssiii me hai */}
                    <BuildControls
                        addIngredientHandler={this.props.addIngredientHandler}
                        removeIngredientHandler={this.props.removeIngredientHandler}
                        shouldButtonDisable={shouldButtonDisable}
                        currentPrice={this.props.price}
                        shouldOrderButtonDisable={shouldOrderButtonDisable}
                        purchaseHandler={this.purchaseHandler}
                    />
                </Aux>);
            contentOfModal = <OrderSummary
                ingredients={this.props.ingredients}
                closeModalHandler={this.closeModalHandler}
                continuePurchaseHandler={this.continuePurchaseHandler} />
        }

        // conditionally changing content of modal

        if (this.state.loadindDataToServer) {
            contentOfModal = <Spinner />
        }

        return (
            <Aux>
                {/* modal.... purchase k liye or ussme order summary */}

                <Modal showModal={this.state.purchasing} backdropClicked={this.closeModalHandler}>
                    {
                        // conditionally displaying spinner and summary,continuue pe click kiya to spinner ..data jaba takk load hoga tab takk fri modal bhi gayab
                        contentOfModal
                    }

                </Modal>
                {/* server se data laa rehe hai to ussko manage krene k liye */}
                {
                    burger
                }

            </Aux>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        ingredients : state.ingredients,
        price:state.price
    }
}

const mapActionToProps = (dispatch)=>{
    return {
addIngredientHandler:(ingType)=>dispatch({type:actionType.ADD_INGREDIENT,ingredient:ingType}),
removeIngredientHandler:(ingType)=>dispatch({type:actionType.REMOVE_INGREDIENT,ingredient:ingType})

    }
}


export default  connect(mapStateToProps,mapActionToProps) (ErrorHandlerComp(BurgerBuilder, axios));









// // handler for adding or removing ingredients
// addIngredientHandler = (type) => {
//     this.setState(oldState => {
//         oldState.ingredients[type] += 1;
//         oldState.price += INGREDIENT_PRICE[type]
//         return oldState
//     })
// }

// removeIngredientHandler = (type) => {
//     if (this.props.ingredients[type] === 0) {
//         return
//     }
//     this.setState(oldState => {
//         oldState.ingredients[type] -= 1;
//         oldState.price -= INGREDIENT_PRICE[type]
//         return oldState
//     })
// }