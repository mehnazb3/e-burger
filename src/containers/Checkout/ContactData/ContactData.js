import React, {Component} from 'react';
import classes from './ContactData.css'
import axios from '../../../axios-order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';
import FormElement from '../../../components/UI/FormElement/FormElement'

class ContactData extends Component {
	state = {
		loading: null,
    isFormValid: false,
    formFields: {
      name: {
          elementType: 'input',
          config: {
            type: 'text',
            placeholder: 'Your Name',
            name: 'name'
          },
          value: '',
          validations: {
            required: true,
            minLength: 3,
            maxLength: 15
          },
          valid: false,
          touched: false

        },
      email: {
          elementType: 'input',
          config: {
            type: 'text',
            placeholder: 'Your Email',
            name: 'email'
          },
          value: '',
          validations: {
            required: true
          },
          valid: false,
          touched: false
        },
      street: {
          elementType: 'input',
          config: {
            type: 'text',
            placeholder: 'Your Street',
            name: 'address'
          },
          value: '',
          validations: {
            required: true
          },
          valid: false,
          touched: false
        },
      country: {
          elementType: 'select',
          config: {
            options: [{name: "India", value: "india"}, {name: "Berlin", value: "berlin"}, {name: "United Nation", value: "united_nation"} ]
          },
          value: 'india',
          validations: {
            required: true
          },
          valid: true,
          touched: false
        },
      pincode: {
          elementType: 'input',
          config: {
            type: 'text',
            placeholder: 'Your Pincode',
            name: 'pincode'
          },
          value: '',
          validations: {
            required: true,
            minLength: 5,
            maxLength: 8
          },
          valid: false,
          touched: false
       },
      deliveryMethod: {
        elementType: 'select',
        config: {
          options: [{name: "Fastest", value: "fastest"}, {name: "Cheapest", value: "cheapest"} ]
        },
        value: 'fastest',
        validations: {
          required: true
        },
        valid: true,
        touched: false
      }
    }
	}

	placeOrderHandler = (event) => {
		event.preventDefault();
		this.setState({loading: true });
    const formData = this.state.formFields;
    const orders = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: formData.name.value,
        email: formData.email.value,
        address: {
          street: formData.street.value,
          zipcode: formData.pincode.value,
        }
      },
      deliveryMethod: formData.deliveryMethod.value
    }
    axios.post("/orders.json", orders)
      .then( response => {
        console.log(response)
        this.setState({loading: false })
        this.props.history.push('/')
      })
      .catch(error => {
        console.log(error)
      })

	}

  checkValidity = (value, rules) => {
    let isValid = true;
    if ( rules.required && (value.length == 0) ) {
      isValid = false;
    }
    if (rules.minLength && (value.length < rules.minLength) ) {
      isValid = false;
    }
    if ( rules.maxLength && (value.length > rules.maxLength) ) {
      isValid = false;
    }
    console.log("isValid===")
    console.log(isValid)
    return isValid

  }

  inputChangehandler = (event, id) => {
    const fields = {...this.state.formFields}
    fields[id].value = event.target.value
    fields[id].valid = this.checkValidity(event.target.value, fields[id].validations )
    fields[id].touched = true
    let formIsValid = true
    for (let key in fields){
      formIsValid = ( fields[key].valid && formIsValid )
    }
    this.setState({formFields: fields, isFormValid: formIsValid})
  }

  render() {
    const formsElement = []
    for (let key in this.state.formFields ) {
      formsElement.push({
        id: key,
        data: this.state.formFields[key]
      })
    }
  	let form = (<form>
  		  <h1>Please provide contact details</h1>
  		  { formsElement.map( (element) => (
          <FormElement inputtype={element.data.elementType} elementConfig={element.data.config} value={element.data.value} changed={(event) => this.inputChangehandler(event,element.id)} invalid={ !element.data.valid } touched={ element.data.touched }/>
        )) }
  		  <input type='submit' value='ORDER NOW' className={classes.btn} disabled={!this.state.isFormValid} onClick={this.placeOrderHandler}/>
  		</form>
  		)
  	if (this.state.loading) {
  		form = <Spinner/>
  	}
  	return(
  		<div className={classes.ContactData}>
	  		{form}
	  	</div>
  	);
  }
}

export default withErrorHandler(ContactData, axios);