import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/lead-management">Lead Management</Link>
        </li>
        <li>
          <Link to="/interaction-history">Interaction History</Link>
        </li>
        <li>
          <Link to="/lead-notes">Lead Notes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
