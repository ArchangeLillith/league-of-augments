import baseService from '../services/base';
import storage from '../utils/storage';

/**
 * Called from login component, this calls to our api and attempts to return a token which then is set to the local storage
 * @param payload - The sanitized values from the frontend that are being compared to the data in the database
 * @returns A JWT if the login succeeded, or an error if not
 */
const authenticateUserAndStoreToken = async (payload: {
  username: string;
  password: string;
}) => {
  const token = await baseService.post('/auth/login', payload);
  if (!token) return;

  storage.setToken(token);
  return token;
};

export default {
  authenticateUserAndStoreToken,
};
