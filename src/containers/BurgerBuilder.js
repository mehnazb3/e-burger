import React, {Component} from 'react';
import Aux from '../hoc/Aux/Aux';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls'
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import axios from '../axios-order';
import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';



class BurgerBuilder extends Component {
  state = {
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
    return (totalIngredients > 0)
  }

  updatePurchasingHandler = (ingredients) => {
    this.setState({purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false });
  }

  purchaseContinueHandler = () => {
    // const ingredients = this.props.ings
    // let query_params = []
    // for (let i in ingredients) {
    //   query_params.push(i + '=' + ingredients[i])
    // }
    // query_params.push("price="+this.state.totalPrice)
    this.props.history.push("/checkout")
  }

  render(){
    const disableInfo = {...this.props.ings};
    for (let key in disableInfo ) {
      disableInfo[key] = ( disableInfo[key] <= 0)
    }

    let orderSummary = <OrderSummary ingredients={this.props.ings} totalPrice={this.props.price} modalClosed={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler}/>
    if (this.state.loading){
      orderSummary = <Spinner/>
    }
    let burger = this.state.error ? <p>Cannot load Ingredients at this moment</p> : <Spinner/>
    if (this.props.ings){

      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
          <BuildControls purchasing={this.updatePurchasingHandler} add={this.props.addIngredientsToBurger} remove={this.props.removeIngredientsToBurger} disableInfo={disableInfo} totalPrice={this.props.price} purchasable={this.updatePurchasableHandler(this.props.ings)}/>
        </Aux>
      );
    }
    return(
      <Aux>
        <Modal ingredients={this.props.ings} loading={this.state.loading} show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredientsToBurger: (key) => dispatch({type: 'ADD_INGREDIENTS', key: key }),
    removeIngredientsToBurger: (key) => dispatch({type: 'REMOVE_INGREDIENTS', key: key}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));