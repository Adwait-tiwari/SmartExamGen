import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const success = await login(formData);
      if (success) {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Google OAuth Redirect Handler
  const handleGoogleSignIn = () => {
    // Redirects to backend for Google OAuth
    window.open("http://smartexamgen.netlify.app/api/google-auth/google", "_self");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-10">
      <div className="max-w-sm w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailPasswordSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* ✅ Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex items-center justify-center"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            alt="Google"
            className="h-5 w-5 mr-2"
          />
          Sign in with Google
        </button>

        {/* Signup link */}
        <div className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="font-bold text-blue-500 hover:text-blue-800">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
