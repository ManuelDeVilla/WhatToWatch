import { Link } from 'react-router-dom';
import styles from './css/Header.module.css';
import logo from './assets/images/WhatToWatch.png';
import CatalogueLogo from './assets/icons/catalogue.svg?react';


export default function Header({setActiveElements, elementTrigger}) {
  const {setEntryActive} = setActiveElements;
  const {entrySidebarTriggerElement} = elementTrigger;
  const openSideLogin = () => setEntryActive(true);

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
        <button
          ref={entrySidebarTriggerElement}
          onClick={openSideLogin}
        >
          Login
        </button>
      </div>
    </div>
  )
}
