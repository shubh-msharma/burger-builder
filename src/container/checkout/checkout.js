import React, { Component } from 'react'
import CheckoutSummary from '../../components/order/checkout summary/checkoutSummary'
import { Route } from 'react-router'
import ContactData from './contact data/contactData'
export default class checkout extends Component {
    state = {
        ingredients: undefined,
        price:null
    }

    componentDidMount() {
        const ingredients = {};
        let price = 0;
        const query = new URLSearchParams(this.props.location.search)
        for (let entr of query.entries()) {
            if(entr[0] === "price"){
                price = +entr[1]
            }else{
            ingredients[entr[0]] = +entr[1];}
        }
        this.setState(prevState => {
            prevState.ingredients = ingredients
            prevState.price = price;
            return prevState
        })
    }
    checkoutCancelHandler = () => {
        this.props.history.goBack()
    }
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {

        return (
            <div>
                {
                    this.state.ingredients ? <CheckoutSummary
                        checkoutCancelHandler={this.checkoutCancelHandler}
                        checkoutContinueHandler={this.checkoutContinueHandler}
                        ingredients={this.state.ingredients} /> : "loading...."
                }
                <Route path = {this.props.match.url+'/contact-data'} render = {(props)=><ContactData {...props} ingredients = {this.state.ingredients} price = {this.state.price}/>}/>
            </div>
        )
    }
}



