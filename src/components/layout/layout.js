import React, { Component } from 'react'
import Aux from "../../hoc/wrapper"
import Toolbar from '../navigation/toolbar/toolbar'
import './layout.css'
import SideDrawer from "../navigation/side drawer/sideDrawer"
import { connect } from 'react-redux'

class layout extends Component {
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
                <Toolbar 
                isAuthenticated = {this.props.isAuthenticated}
                sideDrawerOpenHandler = {this.sideDrawerOpenHandler}/>
                <SideDrawer 
                isAuthenticated = {this.props.isAuthenticated}
                isSideDrawerOpen = {this.state.isSideDrawerOpen} 
                sideDrawerCloseHandler = {this.sideDrawerCloseHandler}/>
                <main className="content">
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state=>{
    return {
        isAuthenticated:state.authReducer.token !== null
    }
}

export default connect(mapStateToProps)(layout)