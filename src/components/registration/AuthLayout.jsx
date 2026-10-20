import {useState} from 'react'
import styles from './css/Register.module.css'
import Register from './Register'
import Login from './Login'

export default function AuthLayout({entryStatus, sidebar}) {
  const [authType, setAuthType] = useState('LOGIN');
  const {isEntryActive, setEntryActive} = entryStatus;

  return (
    <div
      ref={sidebar}
      className={`${styles.accountContainer} 
      ${isEntryActive
        ? styles.open
        : ''
      }`}
    >
      {
        authType === 'LOGIN' ? (
          <Login
            setters={{
              setEntryActive,
              setAuthType
            }}
            authType={authType}
          />
        ) : (
          <Register
            setters={{
              setEntryActive,
              setAuthType
            }}
            authType={authType}
          />
        )
      }
    </div>
  )
}


