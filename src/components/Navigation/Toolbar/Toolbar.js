import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../UI/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = (props) => {
  return(
    <header className={classes.Toolbar}>
      <div onClick={props.menuClick}>Menu</div>
      <div className={[classes.Logo,classes.DesktopOnly].join(' ')}>
        <Logo>
          <span>Logo Builder</span>
        </Logo>
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems/>
      </nav>
    </header>
  )
}

export default Toolbar;