import React from 'react';
import { Link } from 'react-router-dom';
import { Home, LogIn, UserPlus } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function Navbar() {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-6 w-6 text-indigo-600" />
              <span className="font-bold text-xl">StudentLodge</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user?.name}</span>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Admin Panel
                  </Link>
                )}
                <button className="text-gray-600 hover:text-gray-800">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}