import React, { Component } from 'react'
import Aux from "../../hoc/wrapper"
import Toolbar from '../navigation/toolbar/toolbar'
import './layout.css'
import SideDrawer from "../navigation/side drawer/sideDrawer"


export default class layout extends Component {
    state = {
        isSideDrawerOpen:false
    }

    sideDrawerCloseHandler = ()=>{
        this.setState({isSideDrawerOpen:false})
    }

    sideDrawerOpenHandler = ()=>{
        this.setState({isSideDrawerOpen:true})
    }


    render(){
        return (
            <Aux>
                <Toolbar sideDrawerOpenHandler = {this.sideDrawerOpenHandler}/>
                <SideDrawer isSideDrawerOpen = {this.state.isSideDrawerOpen} sideDrawerCloseHandler = {this.sideDrawerCloseHandler}/>
                <main className="content">
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

