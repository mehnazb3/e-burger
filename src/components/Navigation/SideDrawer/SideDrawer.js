import React from 'react';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux'

const SideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close]
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open]
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}/>
      {
        props.open ?
          <div show={props.open} className={attachedClasses.join(' ')}>
            <div className={classes.Logo}>
              <Logo>
                <span>Burger Builder</span>
              </Logo>
            </div>
            <nav>
              <nav><NavigationItems/></nav>
            </nav>
          </div>  : null
      }
    	
    </Aux>
  );
}
export default SideDrawer;