import { Link } from 'react-router-dom';
import styles from './css/Header.module.css';
import logo from '../../assets/images/WhatToWatch.png';
import MoviesLogo from '../../assets/icons/movies.svg?react';
import SeriesLogo from '../../assets/icons/series.svg?react';
import AnimeLogo from '../../assets/icons/anime.svg?react';
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
          <span className={ "white" }>What</span>
          <span className={ "red" }>To</span>
          <span className={ "white" }>Watch</span>
        </span>
      </Link>

      <div className={ styles.navContainer }>
        <button className={ styles.browseBtn }>
          <MoviesLogo className={ styles.navLogo } />
          <span>Movies</span>
        </button>
        <button className={ styles.browseBtn }>
          <SeriesLogo className={ styles.navLogo } />
          <span>Series</span>
        </button>
        <button className={ styles.browseBtn }>
          <AnimeLogo className={ styles.navLogo } />
          <span>Animes</span>
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
              className={ styles.browseBtn }
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
