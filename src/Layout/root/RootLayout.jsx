import { useEffect, useState } from 'react'
import { Outlet, ScrollRestoration, useLocation, useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header.jsx';
import Footer from '../../components/footer/Footer.jsx';
import styles from './css/RootLayout.module.css';
import { SetFooterCacheContext } from '../../lib/contexts/setCacheContext.js';
import useDynamicElement from '../../lib/custom_hooks/useDynamicElement.jsx';
import Message from '../../components/pop_ups/message/Message.jsx';
import useAuth from '../../lib/custom_hooks/useAuth.jsx';
import AuthLayout from '../../components/registration/AuthLayout.jsx';

export default function RootLayout() {
  // User Session Data
  const session = useAuth();
  // console.log(session);

  // Footer Cache Data
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
      setHideMessage(true);
    }, 9500)

    return () => {
      clearTimeout(messageTimeoutId);
      clearTimeout(hideMessaegTimoutId)
    }
  }, [message])

  // For Dynamic Auth form
  const {
    elementInformation: entrySidebarInfo,
    dynamicElement: entrySidebar,
    dynamicTriggerElement: entrySidebarTriggerElement
  } = useDynamicElement();
  const {
    isActiveElement: isEntryActive,
    setIsActiveElement: setEntryActive
  } = entrySidebarInfo;

  return (
    <div className={ styles.root }>
      {
        /** For Showing Error Messages */
        message &&
        <Message
          message={message}
          hide={hideMessage}
        />
      }

      {/* For Showing the Login/Register Side */}
      <AuthLayout
        entryStatus={{
          isEntryActive,
          setEntryActive
        }}
        sidebar={entrySidebar}
      />

      {/* For Showing Header */}
      <Header
        setActiveElements={{
          setEntryActive
        }}
        elementTrigger={{
          entrySidebarTriggerElement
        }}
        session={session}
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
