// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import Navbar from './components/Navbar';
// import Landing from './pages/Landing';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Home from './pages/Home';
// import Interview from './pages/Interview';
// import Feedback from './pages/Feedback';
// import Dashboard from './pages/Dashboard';
// import Help from './pages/Help';
// import Privacy from './pages/Privacy';
// import Terms from './pages/Terms';

// function PrivateRoute({ children }) {
//   const { user } = useAuth();
//   return user ? children : <Navigate to="/login" replace />;
// }

// function PublicRoute({ children }) {
//   const { user } = useAuth();
//   return user ? <Navigate to="/home" replace /> : children;
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <div className="min-h-screen flex flex-col">
//           <Navbar />
//           <Routes>
//             {/* Public */}
//             <Route path="/"        element={<Landing />} />
//             <Route path="/help"    element={<Help />} />
//             <Route path="/privacy" element={<Privacy />} />
//             <Route path="/terms"   element={<Terms />} />

//             {/* Auth */}
//             <Route path="/login"    element={<PublicRoute><Login /></PublicRoute>} />
//             <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

//             {/* Protected */}
//             <Route path="/home"      element={<PrivateRoute><Home /></PrivateRoute>} />
//             <Route path="/interview" element={<PrivateRoute><Interview /></PrivateRoute>} />
//             <Route path="/feedback"  element={<PrivateRoute><Feedback /></PrivateRoute>} />
//             <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

//             {/* 404 fallback */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </div>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }


import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Interview from './pages/Interview';
import Feedback from './pages/Feedback';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile'; // Imported the new profile page component
import Help from './pages/Help';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/home" replace /> : children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <Routes>
            {/* Public */}
            <Route path="/"        element={<Landing />} />
            <Route path="/help"    element={<Help />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms"   element={<Terms />} />

            {/* Auth */}
            <Route path="/login"    element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

            {/* Protected */}
            <Route path="/home"      element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/interview" element={<PrivateRoute><Interview /></PrivateRoute>} />
            <Route path="/feedback"  element={<PrivateRoute><Feedback /></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/profile"   element={<PrivateRoute><Profile /></PrivateRoute>} /> {/* New Protected Profile Route */}

            {/* 404 fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}