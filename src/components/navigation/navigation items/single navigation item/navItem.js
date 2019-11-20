import React from 'react'
import "./navItem.css"
import { NavLink }  from 'react-router-dom'

export default function navItem(props) {
    return (
    <li className = "navItem"><NavLink to={props.link} exact activeClassName ='active'>{props.children}</NavLink></li>
    )
}
