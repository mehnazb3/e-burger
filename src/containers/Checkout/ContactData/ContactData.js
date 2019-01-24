import React, {Component} from 'react';
import classes from './ContactData.css'
import axios from '../../../axios-order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component {
	state = {
		loading: null
	}
	placeOrderHandler = (event) => {
    console.log(this.props.ingredients)
		event.preventDefault();
		this.setState({loading: true });
    const orders = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Manu",
        email: 'manu@gmail.com',
        address: {
          street: "Rosenthaler str 13",
          zipcode: '11900',
          country: 'Germany'
        }
      },
      deliveryMethod: 'Fastest'
    }
    axios.post("/orders.json", orders)
      .then( response => {
        console.log(response)
        this.setState({loading: false })
        this.props.history.push('/')
      })
      .catch(error => {
        console.log(error)
      })

	}
  render() {
  	let form = (<form>
  		  <h1>Please provide contact details</h1>
  		  <input type='text' name='name' placeholder="Your Name"/>
  		  <input type='text' name='email' placeholder="Your Email"/>
  		  <input type='text' name='address' placeholder="Your Address"/>
  		  <input type='text' name='pincode' placeholder="Your Pincode"/>
  		  <input type='submit' value='ORDER NOW' className={classes.btn} onClick={this.placeOrderHandler}/>
  		</form>
  		)
  	if (this.state.loading) {
  		form = <Spinner/>
  	}
  	return(
  		<div className={classes.ContactData}>
	  		{form}
	  	</div>
  	);
  }
}

export default withErrorHandler(ContactData, axios);