import styles from './css/Register.module.css'
import LoginWithGoogleBtn from './components/LoginWithGoogleBtn'
import useInputHandler from './custom_hooks/useInputHandler';
import ErrorMessage from './components/ErrorMessage';

export default function Register({setters, authType}) {
  const {setEntryActive, setAuthType} = setters;
  const closeButtonHandler = () => setEntryActive(false);

  const {elements, inputState, handlers, formMessage} = useInputHandler(setEntryActive, authType);
  const {form, submit} = elements;
  const {inputValues} = inputState;
  const {onChangeInputHandler} = handlers;

    // Changes the component returned in auth layout to LOGIN
  const changeToLogin = () => setAuthType('LOGIN');

  return (
    <>
      <div className={styles.closeContainer}>
        <button onClick={closeButtonHandler}>X</button>
      </div>
      <span className={styles.formHeader}>Register</span>

      {
        // Show Errors
        formMessage.message && <ErrorMessage message={formMessage.message} />
      }

      <div className={styles.loginTypes}>
        <form ref={form} className={styles.form}>
          <div className={styles.inputContainer}>
            <label htmlFor="username">Username:</label>
            <input onChange={onChangeInputHandler} id='username' type="text" value={inputValues.username} />
            <ul className={styles.error}>
              {
                formMessage?.username?.length !== 0 && (
                  formMessage?.username?.map(msg => (
                    <li key={msg}>{msg}</li>
                  ))
                )
              }
            </ul>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="email">Email:</label>
            <input onChange={onChangeInputHandler} id='email' type="email" value={inputValues.email} />
            <ul className={styles.error}>
              {
                formMessage?.email?.length !== 0 && (
                  formMessage?.email?.map(msg => (
                    <li key={msg}>{msg}</li>
                  ))
                )
              }
            </ul>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password">Password:</label>
            <input onChange={onChangeInputHandler} id='password' type="password" value={inputValues.password} />
            <ul className={styles.error}>
                {
                  formMessage?.password?.length !== 0 && (
                    formMessage?.password?.map(msg => (
                      <li key={msg}>{msg}</li>
                    ))
                  )
                }
            </ul>
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
          <button onClick={changeToLogin} className={styles.signUpBtn}>Login Here</button>
        </div>
      </div>
    </>
  )
}
