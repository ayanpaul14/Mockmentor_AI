import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import Navbar from './components/Navbar';

import Landing from './pages/Landing';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Interview from './pages/Interview';
import Feedback from './pages/Feedback';
import CodingRound from './pages/CodingRound';
import Help from './pages/Help';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// ── Dark Mode Context ─────────────────────────────────────────────────────────
export const ThemeContext = createContext();
export function useTheme() { return useContext(ThemeContext); }

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  useEffect(() => {
    const root = document.documentElement;
    if (dark) { root.classList.add('dark'); localStorage.setItem('theme', 'dark'); }
    else { root.classList.remove('dark'); localStorage.setItem('theme', 'light'); }
  }, [dark]);
  return (
    <ThemeContext.Provider value={{ dark, setDark, toggle: () => setDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ── Floating Help Button ──────────────────────────────────────────────────────
function FloatingHelp() {
  const location = useLocation();
  // Hide on the help page itself
  if (location.pathname === '/help') return null;
  return (
    <Link
      to="/help"
      title="Help & FAQ"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[#111] dark:bg-white text-white dark:text-[#111] text-xs font-bold px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 group"
    >
      <span className="text-base leading-none">💬</span>
      {/* Label hidden on mobile, shown on sm+ */}
      <span className="hidden sm:inline">Help</span>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col bg-[#fafaf7] dark:bg-[#0d1117] font-sans antialiased text-[#111] dark:text-[#e6edf3] transition-colors duration-200">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/"            element={<Landing />} />
                <Route path="/login"       element={<Login />} />
                <Route path="/register"    element={<Register />} />
                <Route path="/home"        element={<Home />} />
                <Route path="/dashboard"   element={<Dashboard />} />
                <Route path="/profile"     element={<Profile />} />
                <Route path="/interview"   element={<Interview />} />
                <Route path="/feedback"    element={<Feedback />} />
                <Route path="/coding-round" element={<CodingRound />} />
                {/* ✅ Footer link routes — now registered */}
                <Route path="/help"        element={<Help />} />
                <Route path="/privacy"     element={<Privacy />} />
                <Route path="/terms"       element={<Terms />} />
                <Route path="/*"           element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            {/* ✅ Floating help button — visible on every page */}
            <FloatingHelp />
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}