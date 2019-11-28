import React from 'react'
import Burger from "../../burger/Burger"
import Button from '../../UI/button/button'

export default function checkoutSummary(props) {
    return (
        <React.Fragment>
            <div style = {{padding:"10px",textAlign:"center"}}>
        <h1>your burger is ready..</h1>
        <h2>hope this burger tasts well</h2>
        </div>
        <div>
            <Burger ingredients = {props.ingredients}/>
        </div>
        <div style = {{
            display:"flex",
            flexDirection:"row",
            alignContent:"center",
            justifyContent:"center"
        }}>
            <Button btnType="Cancel" 
            clickHandler = {props.checkoutCancelHandler}
            title="Cancel"/>

            <Button btnType="Success" 
            clickHandler = {props.checkoutContinueHandler}
            title="Continue"/>
        </div>
        </React.Fragment>
    )
}



