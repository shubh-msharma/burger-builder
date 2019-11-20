import React, { Component } from 'react'
import "./modal.css"
import Backdrop from '../backdrop/backdrop';
import Aux from '../../../hoc/wrapper'




export default class modal extends Component {

    shouldComponentUpdate(nextProps,nextstate){
        return nextProps.showModal !== this.props.showModal || nextProps.children !== this.props.children
    }
    render() {
        return (
            <Aux>
            <Backdrop backdropClicked = {this.props.backdropClicked} show = {this.props.showModal}/>
        <div className = {this.props.showModal?"Modal show":"Modal hide"}>
            {this.props.children}
        </div>
        </Aux>
        )
    }
}
