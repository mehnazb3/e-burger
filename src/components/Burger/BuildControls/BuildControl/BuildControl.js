import React from 'react';
import classes from './BuildControl.css';
const BuildControl = (props) => {
  return(
    <p className={classes.BuildControl}>
      <span>{props.label}</span>
      <button className={classes.Add} onClick={props.add}>+</button>
      <button className={classes.Minus}onClick={props.remove} disabled={props.disabledInfo}>-</button>
    </p>
  )
}

export default BuildControl;