import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import TradingViewWidget from './components/TradingViewWidget';
import SearchBar from './components/SearchBar';
import CryptoList from './components/CryptoList';
import Footer from './components/Footer';

function App() {
  const [showCryptoList, setShowCryptoList] = useState(true);

  // This will be called by SearchBar when results are returned
  const handleSearchResults = (results) => {
    if (results && results.length > 0) {
      setShowCryptoList(false); // hide list if search results are found
    } else {
      setShowCryptoList(true); // show list if no results
    }
  };

  return (
    <>
      <NavBar />
      <TradingViewWidget />
      <SearchBar onSearchResults={handleSearchResults} />
      {showCryptoList && <CryptoList />}
      <Footer />
    </>
  );
}

export default App;
