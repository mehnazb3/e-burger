import React from 'react';
import classes from './SideDrawerToggle.css';

const SideDrawerToggle = (props) => (
  <div onClick={props.click} className={classes.SideDrawerToggle}>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

export default SideDrawerToggle;