/**
 * 
 * @param {states} - Should expect an obhect that contains the state to clean for the auth forms.
 */
export default function cleanStates({setInputValues, setFormMessage, setEntryActive}) {
  setInputValues(() => ({
    username: '',
    email: '',
    password: ''
  }));
  setFormMessage((object) => {
    const newMessageObject = {};
    Object.keys(object).forEach(key => {
      newMessageObject[key] = ''
    })

    return newMessageObject;
  });
  setEntryActive(false);

  return;
}