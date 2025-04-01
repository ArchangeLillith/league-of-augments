const TOKEN_KEY = 'token';

//Gets the token from the users local storage
const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token;
};

//Sets the token into the users local storage
const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  return true;
};

//Removes the token from the users local storage
const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  return true;
};

export default {
  getToken,
  setToken,
  removeToken,
};
