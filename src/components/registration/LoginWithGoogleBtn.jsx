import GoogleIcon from '../../assets/icons/google.svg?react'
import supabase from '../../lib/api/supabase.js';

export default function LoginWithGoogleBtn({text}) {
  const redirectTo = new URL('/auth/callback', window.location.origin).toString();

  const loginGoogleHandler = async () => {
    try {
      const res = await supabase.auth.signInWithOAuth({
      provider: 'google',
        options: {
          redirectTo
        }
      })

      if (res.error) {
        console.error(res.error)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <button onClick={loginGoogleHandler}>
        <GoogleIcon />
        <span>{text}</span>
    </button>
  )
}
