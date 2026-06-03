import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './context/AuthContext'; 
import Navbar from './components/Navbar';

// Import Layout Layers
import Landing from './pages/Landing'; 
import Home from './pages/Home'; // Your Role Selection Page
import Dashboard from './pages/Dashboard'; // Your Analytics Charts Page
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
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Both pages mapped cleanly to their own links */}
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              <Route path="/profile" element={<Profile />} />
              <Route path="/interview" element={<Interview />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/coding-round" element={<CodingRound />} />

              <Route path="/*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}