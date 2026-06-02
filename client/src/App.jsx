import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Import Layout Component Layers
import Navbar from './components/Navbar';

// Import Dashboard View Components
import Landing from './pages/Landing'; // Dynamic 3D Neon Brain Landing Page
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Interview from './pages/Interview';
import Feedback from './pages/Feedback';
import CodingRound from './pages/CodingRound'; // Monaco Code Editor Workspace

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-[#fafaf7] font-sans antialiased text-[#111]">
          {/* Universal Header Navigation Layer */}
          <Navbar />

          {/* Centralized View Application Routing Matrix */}
          <main className="flex-1">
            <Routes>
              {/* 🏠 Public Facing Component (Accessible to Everyone) */}
              <Route path="/" element={<Landing />} />

              {/* Public Security Access Gates */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Application Feature Core */}
              <Route path="/home" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />

              <Route path="/interview" element={
                <ProtectedRoute>
                  <Interview />
                </ProtectedRoute>
              } />

              <Route path="/feedback" element={
                <ProtectedRoute>
                  <Feedback />
                </ProtectedRoute>
              } />

              {/* Protected Coding Round Integrated IDE Sandbox */}
              <Route path="/coding-round" element={
                <ProtectedRoute>
                  <CodingRound />
                </ProtectedRoute>
              } />

              {/* Catch-All System Fallback Safeguard Routing Redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}