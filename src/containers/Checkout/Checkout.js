import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';

class Checkout extends Component {
  state = {
    ingredients: null
  }

  checkoutCancelHandler = () => {
    this.props.history.push('/');
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  componentDidMount () {
    console.log("hahahha")
    console.log(this.props.location.search)
    const ingredients = {}
    const query_params = new URLSearchParams(this.props.location.search);
    // const title = query_params.get('title');
    for (let param of query_params.entries()) {
      ingredients[param[0]] = +param[1]
    }
    this.setState({ingredients: ingredients})
    console.log(ingredients)
  }

  render () {
    return(
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} onCancel={this.checkoutCancelHandler} onSuccess={this.checkoutContinueHandler} />
        <Route path="/checkout/contact-data" exact render={()=> <ContactData ingredients={this.state.ingredients}/>} />
      </div>
    );
  }

}

export default Checkout;