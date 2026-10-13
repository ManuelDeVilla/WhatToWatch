import { Link } from 'react-router-dom';
import styles from './css/Header.module.css';
import logo from '../../assets/images/WhatToWatch.png';
import CatalogueLogo from '../../assets/icons/catalogue.svg?react';
import UserIcon from '../../assets/icons/user.svg?react';
import { useEffect, useState } from 'react';
import UserAction from './components/UserAction';

export default function Header({setActiveElements, elementTrigger, session}) {
  // For dynamic element
  const {setEntryActive} = setActiveElements;
  const {entrySidebarTriggerElement} = elementTrigger;
  // When the login is clicked, it would update the state to open the dynamic element for Auth.
  const openSideLogin = () => setEntryActive(true);

  // For User Menu Visibility
  const [userMenuVisibility, setUserMenuVisibility] = useState(false);

  useEffect(() => {
    function resetUserMenuVisibility() {
      setUserMenuVisibility(false);
    }

    resetUserMenuVisibility();
  }, [session])

  const userMenuMouseOver = () => {
    if (userMenuVisibility) return;
    setUserMenuVisibility(true);
  };

  const userMenuMouseLeave = () => {
    if (!userMenuVisibility) return;
    setUserMenuVisibility(false);
  }

  console.log(userMenuVisibility)

  return (
    <div className={ styles.headerContainer }>
      <Link to="/" className={ `${styles.logoContainer} ${'title'}` }>
        <img src={ logo } alt="WatchNext Logo" />
        <span className={ styles.logoText }>
          <span className={ "black" }>What</span>
          <span className={ "red" }>To</span>
          <span className={ "black" }>Watch</span>
        </span>
      </Link>

      <div className={ styles.navContainer }>
        <button>
          <CatalogueLogo className={ styles.navLogo } />
          <span>Browse</span>
        </button>
        {
          session ? (
            <div onMouseOver={userMenuMouseOver} onMouseLeave={userMenuMouseLeave} className={styles.user}>
              <UserIcon />
              <UserAction userMenuVisibility={userMenuVisibility} />
            </div>
          ) : (
            <button
              ref={entrySidebarTriggerElement}
              onClick={openSideLogin}
            >
              Login
            </button>
          )
        }
      </div>
    </div>
  )
}
