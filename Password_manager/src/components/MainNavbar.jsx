import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './MainNavbar.css';
import profileIcon from '../assets/profile.jpg'; // Adjust the path to your image file

const MainNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="main-navbar">
      <div className="navbar-logo">Keeper of Keys</div>
      <div className="navbar-links-container">
        <ul className="navbar-links">
          {location.pathname === '/password-generator' ||
          location.pathname === '/add-password' ||
          location.pathname === '/stored-password' ||
          location.pathname === '/stored-card-details' ||
          location.pathname === '/add-card-details' ? (
            <li><Link to="/main">Back to Main</Link></li>
          ) : (
            <li><Link to="/">Sign Out</Link></li>
          )}
        </ul>
        {/* Profile Icon */}
        <img
          src={profileIcon}
          alt="Profile"
          className="profile-icon"
          onClick={() => navigate('/profile')}
        />
      </div>
    </nav>
  );
};

export default MainNavbar;
