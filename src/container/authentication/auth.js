import React, { Component } from 'react'
import FormElement from '../../components/UI/form elements/formsEle'
import Button from '../../components/UI/button/button'
import './auth.css'
import axios from 'axios'
import { connect } from 'react-redux'
import ErrorHandler from '../../hoc/errorHandlerComponent/errorHandlerComp'
import * as actions from '../../store/actions/index'
class Auth extends Component {

    state = {
        controlForm: {
            mail: {
                elementType: "input",
                elementConfig: {
                    type: 'mail',
                    placeholder: "Your E-MAIL",
                    value: ""
                },
                validity: {
                    require: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: 'password',
                    placeholder: "password",
                    value: ""
                },
                validity: {
                    require: true,
                    minlength: 7
                },
                valid: false,
                touched: false
            }, 
        },
        isSignUp:true
    }

    checkValidity = (value, rule) => {
        let isValid = true
        if (rule.require) {
            isValid = value.trim() !== '' && isValid
        }
        if (rule.minlength) {
            isValid = value.trim().length >= rule.minlength && isValid
        }
        return isValid
    }

    submitDataHandler = (event) => {
        event.preventDefault();
        this.props.authenticationHandler(this.state.controlForm.mail.elementConfig.value, 
            this.state.controlForm.password.elementConfig.value,
            this.state.isSignUp);

    }

    inputEventHandler = (event, key) => {
        const target = event.target
        this.setState(prevState => {
            prevState.controlForm[key].elementConfig.value = target.value;
            prevState.controlForm[key].valid = this.checkValidity(target.value, prevState.controlForm[key].validity)
            prevState.controlForm[key].touched = true;
            return prevState
        })

    }

    signInOrSignUp = ()=>{
        this.setState(prevState=>{
            return{
                isSignUp:! prevState.isSignUp
            }
        })
    }

    render() {

        // checking button disablity
        let disable = true
        for (let key in this.state.controlForm) {
            disable = disable && this.state.controlForm[key].valid
        }

        return (
            <div className="contactData">
                <form className="contactForm" onSubmit={this.submitDataHandler}>
                    {
                        Object.keys(this.state.controlForm).map(key => {
                            return <FormElement key={key}
                                {...this.state.controlForm[key]}
                                isValid={this.state.controlForm[key].valid}
                                touched={this.state.controlForm[key].touched}
                                inputEventHandler={(event) => this.inputEventHandler(event, key)} />
                        })
                    }
                    <Button
                        disable={!disable}
                        btnType="Success"
                        title={this.state.isSignUp?"LogIn":"SignUp"} />
                </form>
                        <Button
                        clickHandler = {this.signInOrSignUp}
                        btnType="Cancel"
                        title={this.state.isSignUp?"new user? click here":"login if already have an account"} />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {

    }
}

const mapActionToProps = dispatch => {
    return {
        authenticationHandler: (email, password,isSignUp) => dispatch(actions.authenticate(email, password,isSignUp))
    }
}

export default connect(mapStateToProps, mapActionToProps)(ErrorHandler(Auth, axios));