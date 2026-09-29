import React from 'react'
import styles from '../../css/Register.module.css'
import GoogleIcon from '../../assets/icons/google.svg?react'

export default function Login({entryStatus, sidebar}) {
  const {isEntryActive, setEntryActive}= entryStatus;
  const closeButtonHandler = () => setEntryActive(false);

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
      <span className={styles.formHeader}>Login</span>
      <div className={styles.loginTypes}>
        <form action="" className={styles.form}>
          <div className={styles.inputContainer}>
            <label htmlFor="email">Email:</label>
            <input id='email' type="email" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password">Password:</label>
            <input id='password' type="password" />
          </div>
        </form>
        <div className={styles.alternativeLogin}>
          <div className={styles.alternativeText}>
            <div className={styles.border}></div>
            <span>or</span>
            <div className={styles.border}></div>
          </div>
          <button>
              <GoogleIcon />
              <span>Register with Google</span>
          </button>
        </div>
      </div>
      <div className={styles.interactionContainer}>
        <div className={styles.signup}>
          <span className={styles.header}>New to WhatToWatch?</span>
          <button className={styles.signUpBtn}>Sign Up Here</button>
        </div>
      </div>
    </div>
  )
}
