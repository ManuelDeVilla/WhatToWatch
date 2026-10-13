/**
 * 
 * @param {Object} inputValues - The value of each inputs
 * @returns {Object} returns an object that includes username, email, and password property
 */
export default function checkInputs(inputValues, authType) {
  const username = inputValues.username.trim();
  const email = inputValues.email.trim();
  const password = inputValues.password.trim();

  const errors = {
    username: [],
    email: [],
    password: []
  };

  if (!email.length) errors.email.push('Email should not be empty!'); 
  if (!password.length) errors.password.push('Password should not be empty!');
  if (authType === 'REGISTER') {
    if (!username.length) errors.username.push('Username should not be empty!'); 
  
    const allowedSpecialChar = '!#$&?';
    const usernameRegex = RegExp(`^[a-zA-Z0-9${allowedSpecialChar}]+$`);

    if (!usernameRegex.test(username) || username.length < 4 || username.length > 20) errors.username.push(`Username should have a minimum characters of 4 and maximum characters of 20, and can contain letters, numbers, and [${allowedSpecialChar}].`);
    if (password.length < 6) errors.password.push('Password should have a minimum characters of 6 and have a maximum characters of 20');
  }
  
  return errors;
} 