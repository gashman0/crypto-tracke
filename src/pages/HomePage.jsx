import React from 'react'
import SearchBar from '../components/SearchBar'
import CryptoList from '../components/CryptoList'





const HomePage = () => {

  console.log("My hidden key:", process.env.REACT_APP_COINGECKO_API_KEY);
  
  return (
    <>
        <SearchBar />
        <CryptoList />
    </>
  )
}

export default HomePage