







import React, { Component } from 'react'
import Aux from '../wrapper'
import Modal from '../../components/UI/modal/modal'

export default function errorHandlerComp(ErrorProneComp,axios) {
    return class extends Component {
        constructor(props){
            super(props);
            this.state = {
                err:null
            };
            this.reqInterceptor = axios.interceptors.request.use(req=>{
                this.setState({err:null});
                return req
            });
            this.resInterceptor = axios.interceptors.response.use(res=>res,err=>{
                this.setState({err:err});
            })
        }
        
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor)    
            axios.interceptors.response.eject(this.resInterceptor)
        }

        

        errorConfirmHandler = ()=>{
            this.setState({err:null});
        }

        render() {
            return (
                <Aux>
                    <Modal 
                    backdropClicked = {this.errorConfirmHandler}
                    showModal = {this.state.err}>
                        {this.state.err?this.state.err.message:null}
                    </Modal>
                    <ErrorProneComp {...this.props}/>
                </Aux>
            )
        }
    }

}

