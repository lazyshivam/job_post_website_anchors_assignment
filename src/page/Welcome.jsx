import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after registration
import { Base_Url } from '@/config/config';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
const Welcome = () => {

    const navigate = useNavigate();


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full flex flex-col justify-center items-center space-y-8">
                <div>
                    <h1 className="text-4xl font-bold text-center mb-4">Welcome!</h1>
                    <p className="text-center text-gray-600 text-xl">
                        Please register/login to continue.
                    </p>
                </div>

                <div className="flex space-x-4">
                    <Button onClick={() => navigate('/register')}> Register</Button>
                    <Button onClick={() => navigate('/login')}>LogIn</Button>
                </div>
            </div>
        </div>

    );
};

export default Welcome;
