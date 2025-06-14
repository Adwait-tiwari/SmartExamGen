import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
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
        _id: decoded._id ,
        username: decoded.username,
        email: decoded.email,
        isGoogle: Boolean(decoded.isGoogle ?? false),
        picture: decoded.picture || null,
      };
      setUser(newUser);
      setToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(newUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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

    // ✅ Check if URL contains token from Google OAuth redirect
    const urlParams = new URLSearchParams(window.location.search);
    const oauthToken = urlParams.get('token');
    if (oauthToken) {
      decodeAndSetUser(oauthToken);
      // Remove token from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // ✅ Signup
  const register = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
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
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      decodeAndSetUser(res.data.token);
      return true;
    } catch (err) {
      console.error("Login error:", err);
      throw err.response?.data || { message: 'Login failed' };
    }
  };

  // ✅ Google Login (in case of manual call, but also handled above in `useEffect`)
  const handleGoogleLogin = (token) => {
    decodeAndSetUser(token);
  };

 
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout, handleGoogleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
