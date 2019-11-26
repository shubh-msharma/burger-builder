import React, { Component } from 'react';
import axios from 'axios';
import Order from "../../components/order/order"
import Spinner from '../../components/UI/spinner/spinner'
import "./orders.css"
import * as actions from '../../store/actions/index'
import {connect} from 'react-redux'

class orders extends Component {
    
    componentDidMount(){
        this.props.fetchOrders()
        
    }

    

    render() {
        let orders =<Spinner/>
        if(!this.props.gettingOrdersFromServer){
            orders = this.props.orders.map(order=>{
                return <Order key={order.key} price ={ order.price } ingredients = {order.ingredients}/>
            })
        }

        return (
            <div className="orders">
                {
                    orders
                }
            </div>
        )
    }
}


const mapStateToProps = state=>{
    return {
        orders:state.ordersReducer.oders,
        gettingOrdersFromServer:state.ordersReducer.gettingOrdersFromServer
    }

}

const mapActionToProps = dispatch=>{
    return {
        fetchOrders:()=>dispatch(actions.fetchOders())
    }
}

export default connect(mapStateToProps,mapActionToProps)(orders)