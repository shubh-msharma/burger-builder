import React, { Component } from 'react';
import axios from 'axios';
import Order from "../../components/order/order"
import Spinner from '../../components/UI/spinner/spinner'
import "./orders.css"

export default class orders extends Component {
    
    state = {
        order : [],
        loading:true
    }

    componentDidMount(){
        const fetchedOrders = []
        axios.get('https://burgerbuilder-103ca.firebaseio.com/order.json')
            .then(orders=>{
                for(let key in orders.data){
                    fetchedOrders.push({
                        ...orders.data[key],
                        key
                    })
                }

                this.setState({order:fetchedOrders,loading:false})
            }).catch(err=>{
                console.log(err);
            })
    }

    

    render() {
        let orders =<Spinner/>
        if(!this.state.loading){
            orders = this.state.order.map(order=>{
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
