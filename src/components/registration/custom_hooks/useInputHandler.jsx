import { useEffect, useRef, useState } from 'react'
import useSubmitSignUp from '../handlers/submitSignUp';
import submitSignUp from '../handlers/submitSignUp';
import { useLocation, useNavigate } from 'react-router-dom';

export default function useInputHandler(setMessage) {
  const form = useRef(null);
  const submit = useRef(null);
  const [inputValues, setInputValues] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [formMessage, setFormMessage] = useState(null);

  // For submitting the form
  useEffect(() => {
    const formElement = form.current;
    const submitElement = submit.current;
    if (!formElement) return;
    if (!submitElement) return;

    async function preventForm(e) {
      e.preventDefault();
      const message = await submitSignUp(inputValues);
      setFormMessage(message)
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
