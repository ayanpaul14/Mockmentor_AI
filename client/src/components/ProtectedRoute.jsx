import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  // If there is no token, redirect the user back to the login page safely
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If a token exists, render the requested component layout cleanly
  return children;
}