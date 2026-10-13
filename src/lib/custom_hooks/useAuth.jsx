/**
 * For checking and getting user session
 * Also Handles changes of user auth.
 */

import {useEffect, useState} from 'react'
import supabase from '../api/supabase';

export default function useAuth() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Checks the user session immediately
    supabase.auth.getSession()
    .then(({data: {session}}) => {
      setSession(session)
    });

    // Creates a request to supabase to check the user, if the user no longer exists in the database
    // Sign out the user in the app.
    supabase.auth.getUser()
    .then(({data, error}) => {
      if (error?.status === 401 || error?.status === 403 || (error && !data?.user)) supabase.auth.signOut();
    })

    // When the user token changes, do the callback
    // Note: Everytime you also focus on the website the callback runs.
    const {data: { subscription }} = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    })

    return () => subscription.unsubscribe()
  }, [])

  return session
}
