




import React from 'react'
import logoImage from "../../assetes/images/logo.png"
import "./logo.css"
export default function logo(props) {
    return (
        <div className ="logo" style = {{height:props.height}}>
            <img src = {logoImage} alt = "logo"/>
        </div>
    )
}
