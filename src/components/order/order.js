import React from 'react'
import './order.css'

export default function order(props) {
    let orders = null
    if(props.ingredients){
    orders = Object.keys(props.ingredients).map(ingr => {
        return <span key={ingr}> {ingr} : {props.ingredients[ingr]}</span>
    })}
    return (
        <div className="order">
            <p>ingredients:{orders} </p>
            <p>price: <strong>{props.price}</strong></p>
        </div>
    )
}
