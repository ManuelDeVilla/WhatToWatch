import supabase from "../../../lib/api/supabase";
import cleanStates from "../utils/cleanStates";

export default async function submitSignUp(inputValues, {states}) {
  const {setFormMessage} = states;
  const usernameExists = await checkUsername(inputValues);

  if (usernameExists) {
    setFormMessage({message: `Username already exists.`, type: 'error'})
    return;
  }

  const { error } = await supabase.auth.signUp({
    email: inputValues.email,
    password: inputValues.password,
    options: {
      data: {
        username: inputValues.username
      }
    }
  });

  if (error) {
    setFormMessage({message: `Email already exists.`, type: 'error'})
    return;
  }

  cleanStates(states);
  return;
}

async function checkUsername(inputValues) {
  const username = inputValues.username;
  const { data, error } = await supabase.rpc('register_check_username', {
    n_username: username
  });

  if (error) {
    return error
  } else {
    return !data
  }
}