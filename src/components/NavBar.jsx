import React from 'react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';




const style = {backgroundColor: "black",color: "yellow", padding:"8px", borderRadius: "8px"};
const nostyle = {backgroundColor: ""};
const activeLink = ({isActive}) => isActive ? style : nostyle ;

const NavBar = () => {
  
  return (
    <>
      <header>
        <div className="container">
          <h1 className="logo">🪙 CryptoTracker</h1>
          <nav>
            <ul>
              <li><NavLink to="/" style={activeLink}>Home</NavLink></li>
              <li><NavLink to="/markets" style={activeLink}>Markets</NavLink></li>
              <li><NavLink to="/news" style={activeLink}>News</NavLink></li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}

export default NavBar