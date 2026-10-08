import { useNavigate } from "react-router-dom";
import supabase from "../../../lib/api/supabase";
import { useEffect } from "react";

export default function LoginRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getClaims().then(({data, error}) => {
      if (!error && data?.claims?.sub) {
        navigate('/', {
          replace: true,
          state: {
            message: "There is an error that happened in logging in. Please try again.",
            type: 'success',
            consoleError: "There is an error that happened in logging in. Please try again."
          }
        })
      } else {
        navigate('/', {
          replace: true,
          state: {
            message: "There is an error that happened in logging in. Please try again.",
            type: 'error',
            consoleError: "There is an error that happened in logging in. Please try again."
          }
        })
      }
    })

  }, [navigate])

  return null;
}
