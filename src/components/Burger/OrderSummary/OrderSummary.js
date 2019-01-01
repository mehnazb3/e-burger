import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients)
    .map(ingd => {
  	return (<li key={ingd}><span style={{textTransform: 'capitalize'}}>{ingd}</span> : {props.ingredients[ingd]}</li>);
  });
  return(
    <Aux>
      <h3>Your Order</h3>
      <p>Delicious burge with following ingredients</p>
      <ul>
        {ingredientsSummary}
      </ul>
      <p>
        <strong>
          Total price: {props.totalPrice.toFixed(2)}
        </strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.modalClosed}>Cancel</Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
    </Aux>
  )
}
export default OrderSummary;