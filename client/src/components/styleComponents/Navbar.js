import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/data">Data</Link></li>
        <li><Link to="/dtc">DTC</Link></li>
        <li><Link to="/engineHealth">Engine Health</Link></li>
        <li><Link to="/findMechanic">Find a Specialized Mechanic</Link></li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
