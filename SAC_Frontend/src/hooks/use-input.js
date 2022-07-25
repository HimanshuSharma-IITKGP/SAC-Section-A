import {useState} from 'react';


const useInput = (validator, defaultValue="") => {
  const [enteredValue, setEnteredValue] = useState(defaultValue) ;
  const [isTouched, setIsTouched] = useState(false) ;
  const isValueValid = validator(enteredValue) ;
  const hasError = !isValueValid && isTouched ;

  const valueChangeHandler = event => {
    setIsTouched(true) ;
    setEnteredValue(event.target.value) ;
  }

  const valueBlurHandler = event => {
    setIsTouched(true) ;
  }

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false) ;
  }

  return {
    value: enteredValue,
    isValid: isValueValid,
    hasError,
    changeHandler: valueChangeHandler,
    blurHandler: valueBlurHandler,
    reset
  }
  
}

export default useInput ;
