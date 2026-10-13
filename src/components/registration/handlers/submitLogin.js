import supabase from "../../../lib/api/supabase";
import cleanStates from "../utils/cleanStates";

export default async function submitLogin(inputValues, states) {
  const {email, password} = inputValues;
  const {setFormMessage} = states;
  const {data, error} = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (!data?.session || error) {
    setFormMessage({message: error.message, type: 'error'});
    return;
  }

  cleanStates(states)
}