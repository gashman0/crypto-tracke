import React from 'react';
import { useEffect, useState } from 'react';

const NavBar = () => {
  return (
    <>
      <header>
        <div class="container">
          <h1 class="logo">🪙 CryptoTracker</h1>
          <nav>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Markets</a></li>
              <li><a href="#">News</a></li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}

export default NavBar