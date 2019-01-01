import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Meat', type: 'meat'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Bacon', type: 'bacon'}
];

const BuildControls = (props) => {
  return(
    <div className={classes.BuildControls}>
      <b> Total Price: {props.totalPrice.toFixed(2)} </b>
      <p>Customise your burger by adding ingredients</p>
      { controls.map( ctrl =>(
        <BuildControl key={ctrl.label} label={ctrl.label} add={()=>props.add(ctrl.type)} disabledInfo={props.disableInfo[ ctrl.type ]} remove={()=> props.remove(ctrl.type)}/>
      ))}
      <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.purchasing}>ORDER NOW</button>
    </div>
  )
}
export default BuildControls;