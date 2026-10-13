import { useEffect, useRef, useState } from 'react'
import submitSignUp from '../handlers/submitSignUp';
import checkInputs from '../utils/checkInput';
import submitLogin from '../handlers/submitLogin';

export default function useInputHandler(setEntryActive, authType) {
  const form = useRef(null);
  const submit = useRef(null);
  const [inputValues, setInputValues] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [formMessage, setFormMessage] = useState({
    message: '',
    type: ''
  });

  // For submitting the form
  useEffect(() => {
    const formElement = form.current;
    const submitElement = submit.current;
    if (!formElement) return;
    if (!submitElement) return;

    async function preventForm(e) {
      e.preventDefault();

      // Checks first for inputs
      const errors = checkInputs(inputValues, authType);
      console.log(errors)
      const hasError = Object.values(errors).some(arr => arr.length !== 0);

      // If there are, update the state to an object and in UI should show below the input the mistakes made.
      if (hasError) {
        setFormMessage(errors);
        console.log(errors)
        return;
      }

      // If passed from input checks, then do the submitSignUp auth function.
      try {
        if (authType === 'REGISTER') {
            await submitSignUp(inputValues, {
              setInputValues,
              setFormMessage,
              setEntryActive
            });
        } else if (authType === 'LOGIN') {
          await submitLogin(inputValues, {
            setInputValues,
            setFormMessage,
            setEntryActive
          })
        }
        
      } catch(e) {
        console.log(e)
        setFormMessage('Something Unexpected happened. Please Try Again.')
      }
    }

    formElement.addEventListener('submit', preventForm);
    return () => formElement.removeEventListener('submit', preventForm);
  }, [inputValues]);

  // For input values
  const onChangeInputHandler = (e) => {
    const targetElement = e.target;
    setInputValues((oldData) => ({...oldData, [targetElement.id]: targetElement.value}))
  }

  return {
    elements: {
      form,
      submit
    },
    inputState: {
      inputValues,
      setInputValues
    },
    handlers: {
      onChangeInputHandler
    },
    formMessage
  }
}
