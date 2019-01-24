import React from 'react';
import classes from './Order.css';

const Order = (props) => {
	const items = Object.keys(props.ingredients)
	  .map(key => {
      return <span style={{textTransform: 'capitalize'}}> {key} - {props.ingredients[key]}</span>
	  })
  return(
  	<div className={classes.Order}>
	  	<p><b>Ingredients</b></p>

	  	{items}
	  	<p>You have paid total price of <b>{props.price} INR</b></p>
    </div>
  )
}

export default Order;