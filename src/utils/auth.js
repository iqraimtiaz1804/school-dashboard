// Simple dummy auth utilities
const ADMIN = { email: 'admin@school.com', password: 'admin123' };
const AUTH_KEY = 'school_is_logged_in';

export const login = ({ email, password }) => {
  if (email === ADMIN.email && password === ADMIN.password) {
    localStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const isLoggedIn = () => {
  return localStorage.getItem(AUTH_KEY) === 'true';
};
