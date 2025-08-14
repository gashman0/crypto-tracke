import React, { useState } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import Markets from './pages/Markets';
import News from './pages/News';
import NewsDetails from './pages/NewsDetails';
import CoinPage from './pages/CoinPage';
import NotFound from './pages/NotFound';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path='/markets' element={<Markets />} />
      <Route path='/news' element={<News />} />
      <Route path='/news/:id' element={<NewsDetails />}/>
      <Route path='/coins' element={<CoinPage />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

function App() {
  

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
