import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
  const ingredientsKeys = Object.keys(props.ingredients)
    .map(ingredKey => {
      return [...Array(props.ingredients[ingredKey])].map((_,i) => {
        return <BurgerIngredient key={ingredKey+i} type={ingredKey} />
      })
    })
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top'/>
      {ingredientsKeys}
      <BurgerIngredient type='bread-bottom'/>

    </div>
  )
}

export default Burger;