import React from 'react';
import classes from './FormElement.css';

const FormElement = (props) => {
  let inputElement = null
  const inputClasses = [classes.inputElement];
  if ( props.invalid && props.touched ) {
    inputClasses.push(classes.invalid)
  }
  switch(props.inputtype){
    case ('input'):
      inputElement = <input {...props.elementConfig} value={props.value} onChange={props.changed} className={ inputClasses.join(' ') }/>
      break;
    case ('select'):
      inputElement = (
        <select value={props.value} onChange={props.changed} className={ inputClasses.join(' ') }>
          { props.elementConfig.options.map( item => ( <option value={item.value}>{item.name}</option> ) ) }
        </select>
      );
      break;
    case ('textarea'):
      inputElement = <textarea {...props.elementConfig} value={props.value} />
      break;
  }
  return(
    inputElement
  );
}

export default FormElement;