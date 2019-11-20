import React from 'react'
import './buildControl.css'
export default function buildControl(props) {
    return (
        <div className="BuildControl">
            <div className="Label">{props.label}</div>
            <button className="More" onClick = {props.addIngredientHandler}>More</button>
            <button disabled = {props.shouldButtonDisable} className="Less" onClick = {props.removeIngredientHandler}>Less</button>
        </div>
    )
}
