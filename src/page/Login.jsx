import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after registration
import { Base_Url } from '@/config/config';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/service/userSlice';
import  { AlertComponent }  from '@/helper/AlertComponent';
import { ToastContainer, toast } from 'react-toastify';
const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading,setIsLoading] = useState(false);
   
    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const response = await fetch(`${Base_Url}/user/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userType,
                    email,
                }),
            });

            if (!response.ok) {
                throw new Error(`Registration failed with status: ${response.status}`);
            }

        const res = await response.json();
          if(res.code==200)
          {
            dispatch(loginSuccess(res.data.user));
            localStorage.setItem('accessToken', res.data.token.refresh.token);
            console.log('Logged in successful:', res); // For debugging
              console.log('Navigating to /home'); 
              toast(res.message);
            // After successful registration, redirect to appropriate route
            navigate('/',{replace:true});
        }
          else if (res.code === 401) {
              toast.error(res.message)
        
        }
        } catch (error) {
            console.log(error)
        } finally {
            
            setIsLoading(false);
        }
       
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
             {/* {showAlert && <Alert type={alertType} message={alertMessage} />} */}
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h1 className="text-4xl font-bold text-center mb-4">Welcome!</h1>
                    <p className="text-center text-gray-600 text-xl">
                        Please Login to continue.
                    </p>
                </div>

                <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white" onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="userType" className="block text-gray-700 font-bold mb-2">Login as:</label>
                        <select
                            id="userType"
                            value={userType}
                            onChange={handleUserTypeChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Select User Type</option>
                            <option value="student">Student</option>
                            <option value="company">Company</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                       {isLoading? "Please wait...":'Login'}
                    </button>
                </form>
            </div>
        </div>

    );
};

export default Login;
