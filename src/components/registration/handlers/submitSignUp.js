import supabase from "../../../lib/api/supabase";

export default async function submitSignUp(inputValues) {

  const usernameExists = await checkUsername(inputValues);

  console.log(usernameExists)
  if (usernameExists) {
    return {message: `Username already exists.`, type: 'error'}
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
    return {message: `Email already exists.`, type: 'error'}
  }

  return {message: `Registration Successful.`, type: 'success'}
}

async function checkUsername(inputValues) {
  const { data, error } = await supabase.rpc('register_check_username', {
    n_username: inputValues.username
  });

  console.log(data)
  console.log(error)

  if (error) {
    return error
  } else {
    return !data
  }
}