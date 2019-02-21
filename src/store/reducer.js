import * as actionTypes from './actions';

const initialState = {
  ingredients: {
    salad: 1,
    meat: 1,
    cheese: 1,
    bacon: 1
  },
  totalPrice: 220,
}

const INGREDIENTS_PRICE = {
  salad: 10,
  cheese: 20,
  bacon: 40,
  meat: 50
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
  	case 'ADD_INGREDIENTS':
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.key]: state.ingredients[action.key] + 1
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.key]
      }
    case 'REMOVE_INGREDIENTS':
     return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.key]: state.ingredients[action.key] - 1
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.key]
      }
  }
  return state;
}

export default reducer;