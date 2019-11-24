import React, { Component } from 'react'
import CheckoutSummary from '../../components/order/checkout summary/checkoutSummary'
import { Route } from 'react-router'
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
                    this.props.ingredients ? <CheckoutSummary
                        checkoutCancelHandler={this.checkoutCancelHandler}
                        checkoutContinueHandler={this.checkoutContinueHandler}
                        ingredients={this.props.ingredients} /> : "loading...."
                }
                <Route path = {this.props.match.url+'/contact-data'} component = {ContactData}/>
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return {
        ingredients:state.ingredients
    }
}

export default connect(mapStateToProps)(checkout)

