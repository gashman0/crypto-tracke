import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import TradingViewWidget from '../components/TradingViewWidget';

const MainLayout = () => {
  return (
    <>
        <NavBar />
        <TradingViewWidget />
        <Outlet />
        <Footer />
    </>
  )
}

export default MainLayout