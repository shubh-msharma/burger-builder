import React from 'react'
import Aux from '../../../hoc/wrapper'
import Button from '../../UI/button/button'

export default function orderSummary(props) {
    const ingredientsSummary = Object.keys(props.ingredients).map(igkey => {
        return <li key = {igkey}><span style = {{textTransform:'capitalize'}}>{igkey}</span>:{props.ingredients[igkey]}</li>
    })
    return (
        <Aux>
        <h1>your order</h1>
        <p>delicious order with following ingredients</p>
        <ul>
            {ingredientsSummary}
        </ul>
        <p>continue to check out</p>
        <Button btnType = "Success" title = "CONTINUE" clickHandler = {props.continuePurchaseHandler}/>
        <Button btnType = "Cancel" title = "CANCEL" clickHandler = {props.closeModalHandler}/>

    </Aux>)
}
