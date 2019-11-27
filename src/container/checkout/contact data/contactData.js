import React, { Component } from 'react'
import FormElement from '../../../components/UI/form elements/formsEle'
import Button from '../../../components/UI/button/button'
import './contactData.css'
import axios from 'axios'
import Modal from '../../../components/UI/modal/modal'
import Spinner from '../../../components/UI/spinner/spinner'
import { connect } from 'react-redux'
import ErrorHandler from '../../../hoc/errorHandlerComponent/errorHandlerComp'
import * as actions from '../../../store/actions/index'
class contactData extends Component {

    state = {
        orderForm:{
            name:{
                elementType:"input",
                elementConfig:{
                    type:'text',
                    placeholder:"Your name",
                    value:""
                },
                validity:{
                    require:true
                },
                valid:false,
                touched:false
            },
            mail:{
                elementType:"input",
                elementConfig:{
                    type:'mail',
                    placeholder:"Your E-MAIL",
                    value:""
                },
                validity:{
                    require:true
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:"input",
                elementConfig:{
                    type:'text',
                    placeholder:"Your country",
                    value:""
                },
                validity:{
                    require:true
                },
                valid:false,
                touched:false
            },
            state:{
                elementType:"input",
                elementConfig:{
                    type:'text',
                    placeholder:"Your state",
                    value:""
                },
                validity:{
                    require:true
                },
                valid:false,
                touched:false
            },
            city:{
                elementType:"input",
                elementConfig:{
                    type:'text',
                    placeholder:"Your city",
                    value:""
                },
                validity:{
                    require:true
                },
                valid:false,
                touched:false
            },
            feedback:{
                elementType:"input",
                elementConfig:{
                    type:'textarea',
                    placeholder:"how was your experience",
                    value:""
                },
                validity:{
                    require:true,
                    minlength:6
                },
                valid:false,
                touched:false
            },
            method:{
                elementType:"select",
                options:[{value:"fastest",displayVal:"Fastest"},{value:"cheapest",displayVal:"Cheapest"}],
                elementConfig:{
                    id:'method',
                    name:"select your method",
                    value :"fastest"
                },
                validity:{},
                valid:true,
                touched:false
            }
        }
    }

    checkValidity = (value,rule)=>{
        let isValid = true
        if(rule.require){
            isValid = value.trim() !== '' && isValid
        }
        if(rule.minlength){
            isValid = value.trim().length >= rule.minlength && isValid
        }
        return isValid
    }

    submitDataHandler = (event)=>{
        event.preventDefault();
        this.setState((oldState) => {
            oldState.loadindDataToServer = true;
            return oldState
        })
        const customer = {};
        for(let key in this.state.orderForm){
            customer[key] = this.state.orderForm[key].elementConfig.value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:customer,
            userId:this.props.userId
        }
        this.props.onOrderBurger(order);
    }

    inputEventHandler =(event,key)=>{
        const target = event.target
        this.setState(prevState=>{
            prevState.orderForm[key].elementConfig.value = target.value;
            prevState.orderForm[key].valid = this.checkValidity(target.value,prevState.orderForm[key].validity)
            prevState.orderForm[key].touched = true;
            return prevState
        })

    }

    render() {

        // checking button disablity
        let disable  = true
        for(let key in this.state.orderForm){
            disable = disable && this.state.orderForm[key].valid
        }

        return (
            <div className="contactData">
                {this.props.loadindDataToServer?<Modal showModal={true}><Spinner/></Modal>:null}
            <form className = "contactForm" onSubmit = {this.submitDataHandler}>
                {
                    Object.keys(this.state.orderForm).map(key=>{
                        return <FormElement key={key} 
                        {...this.state.orderForm[key]}
                        isValid = {this.state.orderForm[key].valid}
                        touched = {this.state.orderForm[key].touched}
                        inputEventHandler = {(event)=>this.inputEventHandler(event,key)}/>
                    })
                }
                <Button 
                disable = {! disable}
                btnType="Success" 
                title="Order"/>
            </form>
            </div>
        )
    }
}


const mapStateToProps = state=>{
    return{
        ingredients:state.burgerBuildersReducer.ingredients,
        price:state.burgerBuildersReducer.price,
        loadindDataToServer:state.ordersReducer.loadindDataToServer,
        userId :state.authReducer.userId
    }
}

const mapActionToProps = dispatch=>{
    return {
        onOrderBurger:(orderData)=>{dispatch(actions.purchaseBurger(orderData))}
    }
}

export default connect(mapStateToProps,mapActionToProps)(ErrorHandler(contactData,axios));