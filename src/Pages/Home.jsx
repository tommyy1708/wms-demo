import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Category from '../Components/Category/Category';

const Home = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/home' ? <Category /> : <Outlet></Outlet>}
    </>
  );
};

export default Home;
