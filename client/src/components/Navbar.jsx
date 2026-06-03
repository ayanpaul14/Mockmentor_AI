import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-[#e8e4dc] sticky top-0 z-50 px-4 sm:px-6 lg:px-8 py-3 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Identity Branding Logo */}
        <Link to={user ? "/home" : "/"} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#111] rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="font-bold text-[#111] tracking-tight text-sm sm:text-base">MockMentor</span>
        </Link>

        {/* Global Security Utility Right Actions Panel */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-xs text-[#666] font-medium hidden sm:inline font-sans">
                Logged in as: <strong className="text-[#111]">{user.name}</strong>
              </span>
              
              {/* ✅ DYNAMIC ROUTING FIX: Directing explicitly to your /home workspace dashboard */}
              <Link to="/home" className="bg-[#111] hover:bg-[#222] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-sm">
                Dashboard
              </Link>
              
              <Link to="/profile" className="text-xs font-semibold text-[#555] hover:text-[#111] transition-colors px-1">
                Profile
              </Link>

              <button 
                onClick={handleLogout}
                className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors border-l border-[#e8e4dc] pl-3"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-xs font-semibold text-[#555] hover:text-[#111] transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="bg-[#111] hover:bg-[#222] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all">
                Get Started free →
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
}