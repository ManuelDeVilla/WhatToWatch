import { useEffect, useRef, useState } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import styles from '../css/RootLayout.module.css';
import { SetFooterCacheContext } from '../lib/contexts/setCacheContext.js';
import Login from '../components/registration/Login.jsx';
import Register from '../components/registration/Register.jsx';
import useDynamicElement from '../lib/custom_hooks/useDynamicElement.jsx';

export default function RootLayout() {
  const [footerCachedData, setFooterCachedData] = useState(null);
  const {
    elementInformation: entrySidebarInfo,
    dynamicElement: entrySidebar,
    dynamicTriggerElement: entrySidebarTriggerElement
  } = useDynamicElement()

  const {
    isActiveElement: isEntryActive,
    setIsActiveElement: setEntryActive
  } = entrySidebarInfo;

  return (
    <div className={ styles.root }>
      <Login 
        entryStatus={{
          isEntryActive,
          setEntryActive
        }}
        sidebar={entrySidebar}
      />
      <Header
        setActiveElements={{
          setEntryActive
        }}
        elementTrigger={{
          entrySidebarTriggerElement
        }}
      />
      <main>
        <SetFooterCacheContext value={setFooterCachedData}>
          <Outlet />
        </SetFooterCacheContext>
      </main>
      <Footer cache={{footerCachedData, setFooterCachedData}} />

      <ScrollRestoration />
    </div>
  )
}
