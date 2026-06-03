import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Tracks state for the mobile dropdown tray

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-[#e8e4dc] sticky top-0 z-50 px-4 sm:px-6 lg:px-8 py-3 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo Identity */}
        <Link to={user ? "/home" : "/"} className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <div className="w-8 h-8 bg-[#111] rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="font-bold text-[#111] tracking-tight text-sm sm:text-base">MockMentor</span>
        </Link>

        {/* DESKTOP NAVIGATION VIEWPORT CONTAINER (Hidden on Mobile view <= 640px widths) */}
        <div className="hidden sm:flex items-center gap-4">
          {user ? (
            <>
              <span className="text-xs text-[#666] font-medium font-sans">
                Logged in as: <strong className="text-[#111]">{user.name}</strong>
              </span>
              <Link to="/dashboard" className="bg-[#111] hover:bg-[#222] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-sm">
                Dashboard
              </Link>
              <Link to="/home" className="text-xs font-semibold text-[#555] hover:text-[#111] transition-colors">
                Practice Grid
              </Link>
              <Link to="/profile" className="text-xs font-semibold text-[#555] hover:text-[#111] transition-colors">
                Profile
              </Link>
              <button onClick={handleLogout} className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors border-l border-[#e8e4dc] pl-3">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-xs font-semibold text-[#555] hover:text-[#111] transition-colors">Sign In</Link>
              <Link to="/register" className="bg-[#111] hover:bg-[#222] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all">Get Started free →</Link>
            </>
          )}
        </div>

        {/* MOBILE INTERACTIVE HAMBURGER TOGGLE BUTTON (Visible only on <= 640px screen layouts) */}
        <div className="sm:hidden flex items-center">
          <button 
            type="button" 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-[#111] focus:outline-none p-1 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE CONTAINER DROPDOWN SLIDE-OUT PANEL TRAYS TABS */}
      {isOpen && (
        <div className="sm:hidden mt-3 pt-3 border-t border-[#e8e4dc] space-y-2 animate-fadeIn">
          {user ? (
            <div className="flex flex-col gap-2 pb-2">
              <div className="px-3 py-1 text-xs text-[#666] bg-neutral-50 rounded-lg">
                User: <span className="font-bold text-[#111]">{user.name}</span>
              </div>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block w-full text-center bg-[#111] text-white text-xs font-bold py-2.5 rounded-xl shadow-sm">
                Dashboard (Analytics)
              </Link>
              <Link to="/home" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-xs font-semibold text-[#555] hover:bg-neutral-50 rounded-lg">
                Practice Selection Grid
              </Link>
              <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-xs font-semibold text-[#555] hover:bg-neutral-50 rounded-lg">
                View Profile Stats
              </Link>
              <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-lg border-t border-dashed border-neutral-100 mt-1">
                Logout Session
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pb-2">
              <Link to="/login" onClick={() => setIsOpen(false)} className="block text-center text-xs font-semibold text-[#555] py-2 hover:bg-neutral-50 rounded-lg">
                Sign In
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="block text-center bg-[#111] text-white text-xs font-bold py-2.5 rounded-xl">
                Get Started free →
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}