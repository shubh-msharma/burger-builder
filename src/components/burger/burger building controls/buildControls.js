import React from 'react'
import BuildControl from './singleBuildControl/buildControl'
import "./buildControls.css"
export default function buildControls(props) {
    const controls = [
        { label: "Salad", type: "salad" },
        { label: "Meat", type: "meat" },
        { label: "Bacon", type: "bacon" },
        { label: "Cheese", type: "cheese" }
    ]
    return (
        <div className="buildControls">
            <p>total price: <strong>{props.currentPrice}</strong></p>
            {
                controls.map(ctrl => <BuildControl label={ctrl.label} key={ctrl.label}
                    addIngredientHandler={() => props.addIngredientHandler(ctrl.type)}
                    removeIngredientHandler={() => props.removeIngredientHandler(ctrl.type)}
                    shouldButtonDisable={props.shouldButtonDisable[ctrl.type]} />)
            }
            <button 
            disabled = { props.shouldOrderButtonDisable}
            onClick = {props.purchaseHandler}
            className = "OrderButton">ORDER NOW</button>
        </div>
    )
}
