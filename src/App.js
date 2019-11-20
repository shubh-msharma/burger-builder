import React from 'react';
import Layout from './components/layout/layout'
import BurgerBuilder from './container/burger builder/BurgerBuilder'
import Checkout from './container/checkout/checkout'
import Orders from './container/orders/orders'
import { Route ,Switch } from 'react-router-dom' 
function App() {
  return (
    <Layout>
      <Switch>
      <Route path = "/" exact component = {BurgerBuilder}/>
      <Route path = "/checkout" component  ={Checkout}/>
      <Route path = "/orders" component = {Orders}/>
      </Switch>
    </Layout>
  );
}

export default App;
