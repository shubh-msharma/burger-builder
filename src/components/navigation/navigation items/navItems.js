import React from 'react'
import "./navItems.css"
import NavItem from "./single navigation item/navItem"
export default function navItems(props) {
    return (
        <ul className = "navItems">

            <NavItem link = "/">Burger builder</NavItem>
            <NavItem link = "/orders">orders</NavItem>
            <NavItem link = "/auth">login</NavItem>
        </ul>
    )
}
