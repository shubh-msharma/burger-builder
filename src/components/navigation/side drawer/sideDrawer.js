import React ,{ Fragment }  from "react";
import Logo from "../../logo/logo";
import NavItems from "../navigation items/navItems";
import "./sideDrawer.css";
import Backdrop from '../../UI/backdrop/backdrop'
export default function sideDrawer(props) {
    return (
        <Fragment>
        <Backdrop show = {props.isSideDrawerOpen}  backdropClicked = {props.sideDrawerCloseHandler}/>
        <div className= {props.isSideDrawerOpen?"sideDrawer open":"sideDrawer close"}>
                <Logo height = "10%"/>
            <nav>
                <NavItems />
            </nav>
        </div>
        </Fragment>
    );
}
