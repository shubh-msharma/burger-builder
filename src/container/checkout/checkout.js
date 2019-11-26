import React, { Component } from 'react'
import CheckoutSummary from '../../components/order/checkout summary/checkoutSummary'
import { Route , Redirect} from 'react-router'
import ContactData from './contact data/contactData'
import { connect} from 'react-redux'

class checkout extends Component {
    
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
                        this.props.ingredients ? this.props.purchased?<Redirect to= "/"/>:<CheckoutSummary
                        checkoutCancelHandler={this.checkoutCancelHandler}
                        checkoutContinueHandler={this.checkoutContinueHandler}
                        ingredients={this.props.ingredients} /> : <Redirect to= "/"/>
                }
                <Route path = {this.props.match.url+'/contact-data'} component = {ContactData}/>
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return {
        ingredients:state.burgerBuildersReducer.ingredients,
        purchased:state.ordersReducer.purchased
    }
}

export default connect(mapStateToProps)(checkout)

