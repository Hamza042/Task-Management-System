import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from "../redux/hooks";
import { clearCredentials } from "../redux/slices/AuthSlice";
import { clearUser } from "../redux/slices/UserSlice";


function Topbar() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(clearCredentials());
    dispatch(clearUser());
    console.log('Logout clicked');
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  // Close the menu when clicking outside
  const closeMenu = () => {
    setProfileMenuOpen(false);
  };

  return (
    <div className="flex items-center justify-between px-6 py-2 bg-white text-gray shadow-md">
      <div className="flex items-center cursor-pointer">
        <FontAwesomeIcon icon={faHome} size="2x" className="mr-2" />
        <h1 className="text-xl font-bold">Task Management System</h1>
      </div>

      <div className="flex items-center space-x-4 relative">
        {/* Profile button */}
        <button 
          className="flex items-center hover:bg-gray-700 hover:text-white px-3 py-2 rounded transition duration-300" 
          onClick={toggleProfileMenu}
        >
          <FontAwesomeIcon icon={faUserCircle}  size="2x" className="mr-2" />
          
          
        </button>

        {/* Profile menu */}
        {isProfileMenuOpen && (
          <div 
            className="absolute right-0  mt-7 bg-gray-700 border rounded shadow-lg"
            onMouseLeave={closeMenu} // Close menu on mouse leave
          >
            <button 
              className="block px-2 py-2 text-left hover:bg-gray-700 hover:text-blue text-white" 
              onClick={() => handleNavigation('profile')}
            >
              View Profile
            </button>
            <button 
              className="block px-2 py-2 text-left hover:bg-gray-700  hover:text-blue text-white" 
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Topbar;
