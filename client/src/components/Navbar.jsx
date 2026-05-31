// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <nav className="bg-white border-b border-[#e8e4dc] sticky top-0 z-50">
//       <div className="page-wrap h-14 flex items-center justify-between">

//         {/* Logo */}
//         <Link to={user ? '/home' : '/'} className="flex items-center gap-2.5 flex-shrink-0">
//           <div className="w-7 h-7 bg-[#111] rounded-md flex items-center justify-center">
//             <span className="text-white text-xs font-semibold">M</span>
//           </div>
//           <span className="font-medium text-[#111] text-sm tracking-tight">MockMentor</span>
//         </Link>

//         {/* Right */}
//         <div className="flex items-center gap-1 sm:gap-2">
//           {user ? (
//             <>
//               <span className="text-[#bbb] text-xs hidden md:block mr-1">
//                 {user.name.split(' ')[0]}
//               </span>
//               <Link to="/dashboard" className="btn-secondary py-1.5 px-3 text-xs">
//                 Dashboard
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="text-[#aaa] hover:text-[#111] text-xs px-2 sm:px-3 py-1.5 transition-colors"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="text-[#aaa] hover:text-[#111] text-xs px-2 sm:px-3 py-1.5 transition-colors"
//               >
//                 Login
//               </Link>
//               <Link to="/register" className="btn-primary py-1.5 px-3 sm:px-5 text-xs">
//                 Get started
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

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
    <nav className="bg-white border-b border-[#e8e4dc] sticky top-0 z-50">
      <div className="page-wrap h-14 flex items-center justify-between">

        {/* Logo */}
        <Link to={user ? '/home' : '/'} className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-7 h-7 bg-[#111] rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-semibold">M</span>
          </div>
          <span className="font-medium text-[#111] text-sm tracking-tight">MockMentor</span>
        </Link>

        {/* Right Navigation Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {user ? (
            <>
              {/* Dynamic User Profile Link */}
              <Link 
                to="/profile" 
                className="text-[#777] hover:text-indigo-600 font-medium text-xs mr-2 transition-colors duration-150"
                title="View Profile Dashboard"
              >
                {user.name ? user.name.split(' ')[0] : 'Profile'}
              </Link>
              
              <Link to="/dashboard" className="btn-secondary py-1.5 px-3 text-xs">
                Dashboard
              </Link>
              
              <button
                onClick={handleLogout}
                className="text-[#aaa] hover:text-[#111] text-xs px-2 sm:px-3 py-1.5 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[#aaa] hover:text-[#111] text-xs px-2 sm:px-3 py-1.5 transition-colors"
              >
                Login
              </Link>
              <Link to="/register" className="btn-primary py-1.5 px-3 sm:px-5 text-xs">
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}