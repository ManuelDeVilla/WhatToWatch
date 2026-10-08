import React, { useState } from 'react'
import styles from '../../css/Register.module.css'
import LoginWithGoogleBtn from './LoginWithGoogleBtn'
import useInputHandler from './custom_hooks/useInputHandler';

export default function Register({
  entryStatus,
  sidebar,
  setters
}) {
  const {isEntryActive, setEntryActive} = entryStatus;
  const {setMessage} = setters
  const closeButtonHandler = () => setEntryActive(false);

  const {elements, inputState, handlers, formMessage} = useInputHandler(setMessage);
  const {form, submit} = elements;
  const {inputValues} = inputState;
  const {onChangeInputHandler} = handlers;

  return (
    <div
      ref={sidebar}
      className={`${styles.accountContainer} 
      ${isEntryActive
        ? styles.open
        : ''
      }`}
    >
      <div className={styles.closeContainer}>
        <button onClick={closeButtonHandler}>X</button>
      </div>
      <span className={styles.formHeader}>Register</span>

      {
        // Show Errors
        formMessage && (
          <span>{formMessage.message}</span>
        )
      }

      <div className={styles.loginTypes}>
        <form ref={form} className={styles.form}>
          <div className={styles.inputContainer}>
            <label htmlFor="username">Username:</label>
            <input onChange={onChangeInputHandler} id='username' type="text" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="email">Email:</label>
            <input onChange={onChangeInputHandler} id='email' type="email" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password">Password:</label>
            <input onChange={onChangeInputHandler} id='password' type="password" />
          </div>
          <button ref={submit} type='submit'>Submit</button>
        </form>
        <div className={styles.alternativeLogin}>
          <div className={styles.alternativeText}>
            <div className={styles.border}></div>
            <span>or</span>
            <div className={styles.border}></div>
          </div>
          <LoginWithGoogleBtn text={'Create Account with Google'} />
        </div>
      </div>
      <div className={styles.interactionContainer}>
        <div className={styles.signup}>
          <span className={styles.header}>Already have an account?</span>
          <button className={styles.signUpBtn}>Login Here</button>
        </div>
      </div>
    </div>
  )
}
