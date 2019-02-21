import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

class Checkout extends Component {
  // state = {
  //   ingredients: null,
  //   totalPrice: 0
  // }

  checkoutCancelHandler = () => {
    this.props.history.push('/');
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  // componentWillMount () {
  //   const ingredients = {}
  //   let price = 0
  //   const query_params = new URLSearchParams(this.props.location.search);
  //   for (let param of query_params.entries()) {
  //     if (param[0] === 'price'){
  //       price = param[1]
  //     } else{
  //       ingredients[param[0]] = +param[1]
  //     }
  //   }
  //   this.setState({ingredients: ingredients, totalPrice: price})
  //   console.log(ingredients)
  // }

  render () {
    return(
      <div>
        <CheckoutSummary ingredients={this.props.ings} onCancel={this.checkoutCancelHandler} onSuccess={this.checkoutContinueHandler} />
        <Route path="/checkout/contact-data" component={ContactData} />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  }
}


export default connect(mapStateToProps)(Checkout);