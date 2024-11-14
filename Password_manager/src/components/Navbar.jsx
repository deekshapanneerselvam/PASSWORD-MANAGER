import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // For styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Keeper of Keys</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
