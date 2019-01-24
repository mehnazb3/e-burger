import React, {Component} from 'react';
import classes from './Orders.css';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  state = {
    orders: null,
    loading: false
  }
  componentWillMount () {
    this.setState({loading: true})
    axios.get("https://e-burger.firebaseio.com/orders.json")
      .then( res => {
        const orders = []
        for (let key in res.data){
          console.log(res.data[key])
          if (res.data[key].ingredients){
            orders.push({ ingredients: {...res.data[key].ingredients}, id: key, price: res.data[key].price })
          }
        }
        this.setState({orders: orders})
      })
    console.log(this.state.orders)
    this.setState({loading: false})
  }
  render() {
    let myOrders = null
    if (this.state.orders){
      myOrders = (this.state.orders.map( order => {
          return <Order ingredients={order.ingredients} price={order.price}/>
        }) );
    } else {
      myOrders = <Spinner />
    }
  	return (
      <div className={classes.Orders}>
        <h1>My orders</h1>
        {myOrders}
      </div>
  	)
  }
}

export default Orders;