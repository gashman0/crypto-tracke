import React from 'react'
import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import TradingViewWidget from './components/TradingViewWidget'
import SearchBar from './components/SearchBar'
import Footer from './components/Footer'





function App() {
  const [count, setCount] = useState(0);
  
  

  return (
    <>
      <NavBar />
      <TradingViewWidget />
      <SearchBar />
      <Footer />
    </>
  )
}

export default App
