import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './context/AuthContext'; 

// Import Layout Component Layers
import Navbar from './components/Navbar';

// Import Dashboard View Components
import Landing from './pages/Landing'; 
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Interview from './pages/Interview';
import Feedback from './pages/Feedback';
import CodingRound from './pages/CodingRound'; 

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-[#fafaf7] font-sans antialiased text-[#111]">
          {/* Universal Header Navigation Layer */}
          <Navbar />

          <main className="flex-1">
            <Routes>
              {/* Public Facing Component */}
              <Route path="/" element={<Landing />} />

              {/* Public Access Portals */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* 🔓 Unlocked Core Panel Matrix */}
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/interview" element={<Interview />} />
              <Route path="/feedback" element={<Feedback />} />

              {/* 🔓 Unlocked Monaco IDE Workspace Playground */}
              <Route path="/coding-round" element={<CodingRound />} />

              {/* Catch-All System Fallback Safeguard Routing Redirect */}
              <Route path="/*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}