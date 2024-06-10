import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Auth from './Auth';
import Home from '../routes/Home';
import Nav from './Nav';
import Profile from '../routes/Profile';

const AppRouter = ({ isLoggedIn }) => {
  return (
    <>
      {isLoggedIn && <Nav />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </>
        ) : (
          <Route path="/" element={<Auth />}></Route>
        )}
      </Routes>
    </>
  );
};

export default AppRouter;
