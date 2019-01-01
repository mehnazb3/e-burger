import React, {Component} from 'react';
import Aux from '../hoc/Aux';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls'
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICE = {
  salad: 10,
  cheese: 20,
  bacon: 40,
  meat: 50
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 1,
      cheese: 2,
      bacon: 1,
      meat: 1
    },
    totalPrice: 220,
    purchasable: false,
    purchasing: false
  }

  updatePurchasableHandler = (ingredients) => {
    const totalIngredients = Object.keys(ingredients).map(ingdnt=> { return ingredients[ingdnt] } ).reduce((arr,el) => { return arr + el}, 0)
    this.setState({purchasable: (totalIngredients > 0) })
  }

  updatePurchasingHandler = (ingredients) => {
    this.setState({purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false })
  }

  purchaseContinueHandler = () => {
    alert('You continue')
  }

  addIngredientsHandler = (type) => {
    const oldIngredients = this.state.ingredients
    oldIngredients[type] = oldIngredients[type] + 1
    this.setState({ingredients: oldIngredients})
    const oldPrice = this.state.totalPrice
    const updatePrice = oldPrice + INGREDIENTS_PRICE[type]
    this.setState({totalPrice: updatePrice})
    this.updatePurchasableHandler(oldIngredients)
  }

  removeIngredientsHandler = (type) => {
    const oldIngredients = this.state.ingredients
    if (oldIngredients[type] > 0) {
      oldIngredients[type] = oldIngredients[type] - 1
      this.setState({ingredients: oldIngredients})
      const oldPrice = this.state.totalPrice
      const updatePrice = oldPrice - INGREDIENTS_PRICE[type]
      this.setState({totalPrice: updatePrice})
    }
    this.updatePurchasableHandler(oldIngredients)
  }

  render(){
    const disableInfo = {...this.state.ingredients};
    for (let key in disableInfo ) {
      disableInfo[key] = ( disableInfo[key] <= 0)
    }

    return(
      <Aux>
        <Modal ingredients={this.state.ingredients} show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} modalClosed={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler}/>
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls purchasing={this.updatePurchasingHandler} add={this.addIngredientsHandler} remove={this.removeIngredientsHandler} disableInfo={disableInfo} totalPrice={this.state.totalPrice} purchasable={this.state.purchasable}/>
      </Aux>
    )
  }
}

export default BurgerBuilder;