import React from 'react'
import "./navItems.css"
import NavItem from "./single navigation item/navItem"
export default function navItems(props) {
    return (
        <ul className = "navItems">

            <NavItem link = "/">Burger builder</NavItem>
            {props.isAuthenticated?<NavItem link = "/orders">orders</NavItem>:null}
            {
                props.isAuthenticated?<NavItem link = "/logout">logout</NavItem>:<NavItem link = "/auth">login</NavItem>
            }
            
        </ul>
    )
}
