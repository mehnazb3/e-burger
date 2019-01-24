import React from 'react';
import Burger from '../../Burger/Burger';
// import Aux from '../../../hoc/Aux/Aux'
import classes from './CheckoutSummary.css';
import Button from '../../UI/Button/Button';
// import {Route} from 'react-router-dom';
// import ContactData from '../../../containers/Checkout/ContactData/ContactData';
// import {withRouter} from 'react-router-dom';

const CheckoutSummary = (props) => {
  return(
  	<div className={classes.CheckoutSummary}>
  	  <h1 style={{textAlign: 'center'}}>Your burger is almost ready!!!!</h1>
  	  <Burger ingredients={props.ingredients}/>
  	  <div className={classes.Button}>
	  	  <Button btnType="Danger" clicked={props.onCancel}>Cancel</Button>
	      <Button btnType="Success" clicked={props.onSuccess}>Continue</Button>
	    </div>
  	</div>
  );
}

export default CheckoutSummary;