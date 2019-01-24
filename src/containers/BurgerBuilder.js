import React, {Component} from 'react';
import Aux from '../hoc/Aux/Aux';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls'
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import axios from '../axios-order';
import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICE = {
  salad: 10,
  cheese: 20,
  bacon: 40,
  meat: 50
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 220,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount = () => {
    axios.get("https://e-burger.firebaseio.com/ingredients.json")
      .then(response =>{
        this.setState({ingredients: response.data})
      })
      .catch(error => {this.setState({error: true})});
  }

  updatePurchasableHandler = (ingredients) => {
    const totalIngredients = Object.keys(ingredients).map(ingdnt=> { return ingredients[ingdnt] } ).reduce((arr,el) => { return arr + el}, 0)
    this.setState({purchasable: (totalIngredients > 0) })
  }

  updatePurchasingHandler = (ingredients) => {
    this.setState({purchasing: true })
  }

  purchaseCancelHandler = () => {
    console.log("this.props");
    console.log(this.props)
    this.setState({purchasing: false });
  }

  purchaseContinueHandler = () => {
    // alert('You continue')
    const ingredients = this.state.ingredients
    let query_params = []
    for (let i in ingredients) {
      query_params.push(i + '=' + ingredients[i])
    }
    console.log("query_params")
    console.log(query_params)
    query_params.push("price="+this.state.totalPrice)
    this.props.history.push("/checkout?"+query_params.join('&'))

    // this.setState({loading: true });
    // const orders = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Mehnaz Bano",
    //     email: 'mehnazb3@gmail.com',
    //     address: {
    //       street: "Rosenthaler str 13",
    //       zipcode: '11900',
    //       country: 'Germany'
    //     }
    //   },
    //   deliveryMethod: 'Fastest'
    // }
    // axios.post("/orders.json", orders)
    //   .then( response => {
    //     console.log(response)
    //     this.setState({loading: false })
    //     this.setState({purchasing: false})
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     this.setState({purchasing: false})
    //   })
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

    let orderSummary = <OrderSummary ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} modalClosed={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler}/>
    if (this.state.loading){
      orderSummary = <Spinner/>
    }
    let burger = this.state.error ? <p>Cannot load Ingredients at this moment</p> : <Spinner/>
    if (this.state.ingredients){

      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls purchasing={this.updatePurchasingHandler} add={this.addIngredientsHandler} remove={this.removeIngredientsHandler} disableInfo={disableInfo} totalPrice={this.state.totalPrice} purchasable={this.state.purchasable}/>
        </Aux>
      );
      
    }
    return(
      <Aux>
        <Modal ingredients={this.state.ingredients} loading={this.state.loading} show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios);