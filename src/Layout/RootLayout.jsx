import { useEffect, useRef, useState } from 'react'
import { Outlet, ScrollRestoration, useLocation, useNavigate } from 'react-router-dom'
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import styles from '../css/RootLayout.module.css';
import { SetFooterCacheContext } from '../lib/contexts/setCacheContext.js';
import Login from '../components/registration/Login.jsx';
import Register from '../components/registration/Register.jsx';
import useDynamicElement from '../lib/custom_hooks/useDynamicElement.jsx';
import Message from '../components/pop_ups/Message.jsx';

export default function RootLayout() {
  const [footerCachedData, setFooterCachedData] = useState(null);

  // Application Root Messages
  const [message, setMessage] = useState(null);
  const [hideMessage, setHideMessage] = useState(false);

  // Check if there is an error in the login
  const location = useLocation();
  const navigate = useNavigate();

  // Pop up message for login
  // Specifically used for errors
  useEffect(() => {
    if (!location.state) return;
    if (location.state?.consoleError) console.error(location.state?.consoleError)

    function showMessage() {
      setMessage(location.state);
      // Clears the history entry's state
      navigate(location.pathname + location.search, {
        replace: true,
        state: null
      })
    }

    showMessage();
  }, [location, navigate])

  useEffect(() => {
    if (!message) return;

    const messageTimeoutId = setTimeout(() => {
      setMessage(null);
    }, 10000);
    const hideMessaegTimoutId = setTimeout(() => {
      console.log('hide');
      setHideMessage(true);
    }, 9500)

    return () => {
      clearTimeout(messageTimeoutId);
      clearTimeout(hideMessaegTimoutId)
    }
  }, [message])

  // Dynamic For Login
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
      {
        message &&
        <Message
          message={message}
          hide={hideMessage}
        />
      }
      <Register 
        entryStatus={{
          isEntryActive,
          setEntryActive
        }}
        sidebar={entrySidebar}
        setters={setMessage}
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
