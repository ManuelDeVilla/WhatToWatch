import supabase from "../../../lib/api/supabase";

export default async function submitSignUp(inputValues) {

  const {data, error} = await supabase.auth.signUp({
    email: inputValues.email,
    password: inputValues.password,
    options: {
      data: {
        username: inputValues.username
      }
    }
  });

  return {data, error}
}