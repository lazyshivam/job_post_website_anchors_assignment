import React, { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import Header from './page/Header';
import Welcome from './page/Welcome';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import { Coins } from 'lucide-react';
import Register from './page/Register';
import Login from './page/Login';

function App() {
  const dispatch = useDispatch();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.userInfo !== null);
  console.log(isLoggedIn,"app")
 
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Welcome />} />
        {!isLoggedIn ? (
          <>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />

          </>
        ) : (

          <Route path='/home' element={<Home />} />

        )

        }
      </Routes>
    </div>

  )
}

export default App
