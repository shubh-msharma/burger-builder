import React, { Component } from 'react'
import Layout from './components/layout/layout'
import BurgerBuilder from './container/burger builder/BurgerBuilder'
// import Checkout from './container/checkout/checkout'
// import Orders from './container/orders/orders'
// import Auth from './container/authentication/auth'
import { Route, Switch, withRouter ,Redirect} from 'react-router-dom'
import Logout from './container/authentication/logout/logout'
import * as actions from './store/actions/index'
import { connect } from 'react-redux'
import asyncCompLoad from './hoc/asyncLoadingComp/asyncCompLoad'

const LazyAuth = asyncCompLoad(()=>import('./container/authentication/auth'))
const LazyCheckout = asyncCompLoad(()=>import('./container/checkout/checkout'))
const LazyOrders = asyncCompLoad(()=>import('./container/orders/orders'))




class App extends Component {
  componentDidMount() {
    this.props.checkAuthStatus()
  }
  render() {
    let routes = (
      <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/auth" component = {LazyAuth} />
          <Redirect to ="/"/>
        </Switch>
    )
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/auth" component = {LazyAuth} />
          <Route path="/checkout"  component = {LazyCheckout} />
          <Route path="/orders" component = {LazyOrders}  />
          <Route path="/logout" component={Logout} />
          <Redirect to ="/"/>
        </Switch>
      )
    }
    return (
      <Layout>
        {
          routes
        }
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return { isAuthenticated: state.authReducer.token != null}
}

const mapActionToProps = (dispatch) => {
  return {
    checkAuthStatus: () => dispatch(actions.checkAuthStatus())
  }
}

export default withRouter(connect(mapStateToProps, mapActionToProps)(App));
