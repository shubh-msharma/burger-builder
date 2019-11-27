





import React from 'react'
import "./toolbar.css"
import Logo from "../../logo/logo"
import NavItems from '../navigation items/navItems'

export default function toolbar(props) {
    return (
        <header className = "toolbar">
            <div className = "mobileOnly toggler" onClick = {props.sideDrawerOpenHandler}>menu</div>
            <Logo height = "80%"/>
            <nav className = "desktopOnly">
                <NavItems isAuthenticated = {props.isAuthenticated}/>
            </nav>
        </header>
    )
}
