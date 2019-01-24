import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
  let ingredientsKeys = null
  if (props.ingredients) {
    ingredientsKeys = Object.keys(props.ingredients)
      .map(ingredKey => {
        return [...Array(props.ingredients[ingredKey])].map((_,i) => {
          return <BurgerIngredient key={ingredKey+i} type={ingredKey} />
        })
      })
      .reduce( (arr,el) => {
        return arr.concat(el)
      }, [])
  }
  
  if (!ingredientsKeys || ingredientsKeys.length === 0 ){
    ingredientsKeys = <p style={{color: '#fff'}}>Please start adding Ingredients</p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top'/>
      {ingredientsKeys}
      <BurgerIngredient type='bread-bottom'/>

    </div>
  )
}

export default Burger;