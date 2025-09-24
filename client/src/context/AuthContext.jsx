import { createContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // ✅ Extract user from token
  const decodeAndSetUser = (token) => {
    try {
      const decoded = jwtDecode(token);
      const newUser = {
        _id: decoded._id,
        username: decoded.username,
        email: decoded.email,
        isGoogle: Boolean(decoded.isGoogle ?? false),
        picture: decoded.picture || null,
      };
      setUser(newUser);
      setToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(newUser));

      // Always attach token to your api instance
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (err) {
      console.error("Token decoding error:", err);
    }
  };

  // ✅ Load token/user on app start
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      decodeAndSetUser(storedToken);
    }

    // ✅ Handle Google OAuth redirect
    const urlParams = new URLSearchParams(window.location.search);
    const oauthToken = urlParams.get('token');
    if (oauthToken) {
      decodeAndSetUser(oauthToken);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // ✅ Signup
  const register = async (formData) => {
    try {
      const res = await api.post('/api/auth/signup', formData);
      decodeAndSetUser(res.data.token);
      return true;
    } catch (err) {
      console.error("Signup error:", err);
      throw err.response?.data || { message: 'Signup failed' };
    }
  };

  // ✅ Manual Login
  const login = async (formData) => {
    try {
      const res = await api.post('/api/auth/login', formData);
      decodeAndSetUser(res.data.token);
      return true;
    } catch (err) {
      console.error("Login error:", err);
      throw err.response?.data || { message: 'Login failed' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
