import React, { Component } from 'react'
import { Redirect } from 'react-router'
import * as actions from '../../../store/actions/index'
import { connect } from 'react-redux'
 class logout extends Component {

    componentDidMount(){
        this.props.logOutHandler()
    }



    render() {
        return <Redirect to="/" />
    }
}

const mapActionToProps =dispatch=>{
    return {
        logOutHandler:()=>dispatch(actions.logOutUser())
    }
}

export default connect(null,mapActionToProps)(logout)
