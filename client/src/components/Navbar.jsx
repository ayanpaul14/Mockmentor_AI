import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../App';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate('/');
  };

  // ── Sun / Moon toggle icon ──────────────────────────────────────────────────
  const ThemeToggle = () => (
    <button
      onClick={toggle}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="w-8 h-8 flex items-center justify-center rounded-xl border transition-all duration-200
        border-[#e8e4dc] bg-white hover:bg-[#f5f2ec] text-[#555]
        dark:border-[#30363d] dark:bg-[#161b22] dark:hover:bg-[#21262d] dark:text-[#8b949e]"
    >
      {dark ? (
        // Sun icon
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#ffa116]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="5" fill="currentColor" stroke="none" />
          <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        // Moon icon
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  );

  return (
    <header className="bg-white dark:bg-[#161b22] border-b border-[#e8e4dc] dark:border-[#30363d] sticky top-0 z-50 px-4 sm:px-6 lg:px-8 py-3 select-none transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Brand */}
        <Link to={user ? "/home" : "/"} className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <div className="w-8 h-8 bg-[#111] dark:bg-white rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white dark:text-[#111] font-bold text-sm">M</span>
          </div>
          <span className="font-bold text-[#111] dark:text-white tracking-tight text-sm sm:text-base">MockMentor</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <>
              <span className="text-xs text-[#666] dark:text-[#8b949e] font-medium font-sans">
                Logged in as: <strong className="text-[#111] dark:text-white">{user.name}</strong>
              </span>
              <Link to="/dashboard"
                className="bg-[#111] dark:bg-white hover:bg-[#222] dark:hover:bg-[#f0ede6] text-white dark:text-[#111] text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-sm">
                Dashboard
              </Link>
              <Link to="/home"
                className="text-xs font-semibold text-[#555] dark:text-[#8b949e] hover:text-[#111] dark:hover:text-white transition-colors">
                Practice Grid
              </Link>
              <Link to="/profile"
                className="text-xs font-semibold text-[#555] dark:text-[#8b949e] hover:text-[#111] dark:hover:text-white transition-colors">
                Profile
              </Link>
              <button onClick={handleLogout}
                className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors border-l border-[#e8e4dc] dark:border-[#30363d] pl-3">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login"
                className="text-xs font-semibold text-[#555] dark:text-[#8b949e] hover:text-[#111] dark:hover:text-white transition-colors">
                Sign In
              </Link>
              <Link to="/register"
                className="bg-[#111] dark:bg-white hover:bg-[#222] dark:hover:bg-[#f0ede6] text-white dark:text-[#111] text-xs font-semibold px-4 py-2 rounded-xl transition-all">
                Get Started free →
              </Link>
            </>
          )}
        </div>

        {/* Mobile: toggle + hamburger */}
        <div className="sm:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#111] dark:text-white focus:outline-none p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-[#21262d] transition-colors"
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

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="sm:hidden mt-3 pt-3 border-t border-[#e8e4dc] dark:border-[#30363d] space-y-2 animate-fadeIn">
          {user ? (
            <div className="flex flex-col gap-2 pb-2">
              <div className="px-3 py-1 text-xs text-[#666] dark:text-[#8b949e] bg-neutral-50 dark:bg-[#21262d] rounded-lg">
                User: <span className="font-bold text-[#111] dark:text-white">{user.name}</span>
              </div>
              <Link to="/dashboard" onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-[#111] dark:bg-white text-white dark:text-[#111] text-xs font-bold py-2.5 rounded-xl shadow-sm">
                Dashboard (Analytics)
              </Link>
              <Link to="/home" onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-xs font-semibold text-[#555] dark:text-[#8b949e] hover:bg-neutral-50 dark:hover:bg-[#21262d] rounded-lg">
                Practice Selection Grid
              </Link>
              <Link to="/profile" onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-xs font-semibold text-[#555] dark:text-[#8b949e] hover:bg-neutral-50 dark:hover:bg-[#21262d] rounded-lg">
                View Profile Stats
              </Link>
              <button onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg border-t border-dashed border-neutral-100 dark:border-[#30363d] mt-1">
                Logout Session
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pb-2">
              <Link to="/login" onClick={() => setIsOpen(false)}
                className="block text-center text-xs font-semibold text-[#555] dark:text-[#8b949e] py-2 hover:bg-neutral-50 dark:hover:bg-[#21262d] rounded-lg">
                Sign In
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)}
                className="block text-center bg-[#111] dark:bg-white text-white dark:text-[#111] text-xs font-bold py-2.5 rounded-xl">
                Get Started free →
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}