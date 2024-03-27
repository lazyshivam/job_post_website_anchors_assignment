import React, { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import Header from './page/Header';
import Welcome from './page/Welcome';
import { Routes, Route } from 'react-router-dom';
import Home from './page/StudentHome';
import { Coins } from 'lucide-react';
import Register from './page/Register';
import 'react-toastify/dist/ReactToastify.css';
import Login from './page/Login';
import StudentHome from './page/StudentHome';
import StudentDashBoard from './page/StudentDashBoard';
import CompanyDashboard from './page/CompanyDashboard';
import CompanyHome from './page/CompanyHome';
import { ToastContainer, toast } from 'react-toastify';
import CreateCompanyProfileForm from './page/CreateCompanyProfileForm';
import CreateStudentProfile from './page/CreateStudentProfile';
function App() {
  const dispatch = useDispatch();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.userInfo);
  console.log(isLoggedIn, "app")
  
  return (
    <div className="App">
      <Header />
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Welcome />} />
        {!isLoggedIn ? (
          <>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />

          </>
        ) : (
          isLoggedIn.userType === 'student' ? (
              <>
              <Route path='/createProfile' element={<CreateStudentProfile/>} />
              <Route path='/home' element={<StudentHome />} />
              <Route path='/dashboard' element={<StudentDashBoard />} />
            </>
          ) : (
                <>
              <Route path='/createProfile' element={<CreateCompanyProfileForm/>} />
              <Route path='/home' element={<CompanyHome />} />
              <Route path='/dashboard' element={<CompanyDashboard />} />
            </>
          )

        )

        }
      </Routes>
    </div>

  )
}

export default App
