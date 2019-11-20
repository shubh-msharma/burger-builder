import React, { Component } from 'react'
import Aux from "../../hoc/wrapper"
import Burger from '../../components/burger/Burger'
import BuildControls from '../../components/burger/burger building controls/buildControls'
import Modal from '../../components/UI/modal/modal'
import OrderSummary from '../../components/burger/order summary/orderSummary'
import axios from 'axios'
import Spinner from '../../components/UI/spinner/spinner'
import ErrorHandlerComp from '../../hoc/errorHandlerComponent/errorHandlerComp'

const INGREDIENT_PRICE = {
    salad: 15,
    bacon: 20,
    cheese: 25,
    meat: 35
}
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        price: 100,
        purchasing: false,
        loadindDataToServer: false,
        error: false
    }

    // life cycle hooks

    componentDidMount() {
        axios.get("https://burgerbuilder-103ca.firebaseio.com/ingredients.json")
            .then(res => {
                if (res) {
                    this.setState({
                        ingredients: res.data
                    })
                }
                else {
                    this.setState({ error: true })
                }
            })
    }


    // handler for adding or removing ingredients
    addIngredientHandler = (type) => {
        this.setState(oldState => {
            oldState.ingredients[type] += 1;
            oldState.price += INGREDIENT_PRICE[type]
            return oldState
        })
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] === 0) {
            return
        }
        this.setState(oldState => {
            oldState.ingredients[type] -= 1;
            oldState.price -= INGREDIENT_PRICE[type]
            return oldState
        })
    }

    // handler for adding removing modal by changinging value of <purchasing>
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }
    closeModalHandler = () => {
        this.setState({ purchasing: false, error: false })
    }

    continuePurchaseHandler = async () => {
        
        const queryParams = [];
        for(let key in this.state.ingredients){
            queryParams.push(encodeURIComponent(key)+'='+encodeURIComponent(this.state.ingredients[key]));
        }
        const queryString = queryParams.join('&').concat(`&price=${this.state.price}`);
        // queryString = queryString+`&price=${this.state.price}`
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+queryString});
    }

    render() {
        // build Control me less button ko disable krene k liye info
        const shouldButtonDisable = {
            ...this.state.ingredients
        }
        for (let key in shouldButtonDisable) {
            shouldButtonDisable[key] = shouldButtonDisable[key] <= 0
        }
        // order button ko enblse disable krene k liye
        const shouldOrderButtonDisable = !Object.values(shouldButtonDisable).includes(false);
        // ******itta hi tha button ko disable krne ka array dene wala code******

        let burger = this.state.error ? <Modal showModal={this.state.error} backdropClicked={this.closeModalHandler}>ingredients cannot be loaded</Modal> : <Spinner />;
        let contentOfModal = null;
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    {/* burger dikhane k liye */}
                    <Burger ingredients={this.state.ingredients} />

                    {/* controls zyadater isssiii me hai */}
                    <BuildControls
                        addIngredientHandler={this.addIngredientHandler}
                        removeIngredientHandler={this.removeIngredientHandler}
                        shouldButtonDisable={shouldButtonDisable}
                        currentPrice={this.state.price}
                        shouldOrderButtonDisable={shouldOrderButtonDisable}
                        purchaseHandler={this.purchaseHandler}
                    />
                </Aux>);
            contentOfModal = <OrderSummary
                ingredients={this.state.ingredients}
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

export default ErrorHandlerComp(BurgerBuilder, axios);