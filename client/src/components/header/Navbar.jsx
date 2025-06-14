import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">

        {/* Left Links */}
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white hover:text-blue-200 transition">Home</Link></li>
          <li><Link to="/dashboard" className="text-white hover:text-blue-200 transition">Dashboard</Link></li>
          <li><Link to="/generate" className="text-white hover:text-blue-200 transition">Generate</Link></li>
          <li><Link to="/result" className="text-white hover:text-blue-200 transition">Result</Link></li>
        </ul>

        {/* Right Side: Avatar/Login/Signup/Logout */}
        <ul className="flex items-center space-x-3">
          {user ? (
            <>
              <li className="text-white font-semibold">
                Welcome, {user.username?.split(' ')[0] || 'User'}
              </li>

              <li>
                <img
                  src={
                    user.isGoogle
                      ? user.picture || "https://upload.wikimedia.org/wikipedia/commons/0/09/Google_Icon.svg"
                      : `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(user.username)}`
                  }
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-white shadow-sm"
                   referrerPolicy="no-referrer"
                />
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="text-white border border-white px-3 py-1.5 rounded hover:bg-white hover:text-blue-600 transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="text-white px-3 py-1.5 border border-white rounded hover:bg-white hover:text-blue-600 transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-blue-600 bg-white px-3 py-1.5 rounded hover:bg-blue-100 transition"
                >
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
