import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const SignupForm = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err.message || 'Registration failed. Please try again.';

      if (errorMessage.includes('User already exists')) {
        setErrors({
          username: errorMessage.includes('username') ? 'Username already taken' : '',
          email: errorMessage.includes('email') ? 'Email already registered' : '',
          form: errorMessage
        });
      } else {
        setErrors({ form: errorMessage });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-10">
      <div className="max-w-sm w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Sign Up</h2>

        {errors.form && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">{errors.form}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <InputField
            label="Username"
            id="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />

          {/* Email */}
          <InputField
            label="Email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          {/* Password */}
          <InputField
            label="Password"
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          {/* Confirm Password */}
          <InputField
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-blue-500 hover:text-blue-800">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

// ✅ Reusable InputField component for better clarity
const InputField = ({ label, id, type, value, onChange, error }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">{label}:</label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${
        error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
      }`}
    />
    {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
  </div>
);

export default SignupForm;
