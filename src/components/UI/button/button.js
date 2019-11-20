import React from 'react'
import './button.css'
export default function button(props) {
    return (
    <button className = {`Button ${props.btnType}`}
    disabled = {props.disable}
    onClick = {props.clickHandler}>{props.title}</button>
    )
}
