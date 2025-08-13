import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import CryptoList from '../components/CryptoList';



const HomePage = () => {
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
      <SearchBar onSearchResults={handleSearchResults} />
      {showCryptoList && <CryptoList />}
    </>
  )
}

export default HomePage