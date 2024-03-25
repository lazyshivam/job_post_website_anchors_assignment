import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after registration
import { Base_Url } from '@/config/config';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/service/userSlice';
import { Button } from '@/components/ui/button';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"

const Register = () => {
    const buttonRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // const [otp, setOtp] = useState('');
    const [value, setValue] = useState('');
    const handleSendOtp = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        try {
            const response = await fetch(`${Base_Url}/user/auth/sendOtp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                }),
            });

            const data = await response.json();
            if (data && data.status === 400) {
                throw new Error(data.message);
            }
            console.log('OTP sent successfully',data);
            setIsLoading(false);
            buttonRef.current.click();
        } catch (error) {
            console.error('Error sending OTP:', error);
            // Display error message to the user
        }
    };


    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleRegister = async () => {
        // event.preventDefault();
        try {
            const response = await fetch(`${Base_Url}/user/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userType,
                    email,
                    otp:value
                }),
            });

            if (!response.ok) {
                throw new Error(`Registration failed with status: ${response.status}`);
            }

            const data = await response.json();
            dispatch(loginSuccess(data.data.user));
            localStorage.setItem('accessToken', data.data.token.access.token);
            console.log('Registration successful:', data); // For debugging

            // After successful registration, redirect to appropriate route
            navigate('/home');
        } catch (error) {

            console.error('Registration error:', error);

        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h1 className="text-4xl font-bold text-center mb-4">Welcome!</h1>
                    <p className="text-center text-gray-600 text-xl">
                        Please register to continue.
                    </p>
                </div>

                <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white" onSubmit={handleSendOtp}>
                    <div className="mb-4">
                        <label htmlFor="userType" className="block text-gray-700 font-bold mb-2">Register as:</label>
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

                    <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        {!isLoading?'Register':'Pleas wait ...'}
                    </Button>
                </form>
            </div>
            <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className='hidden' ref={buttonRef}>open</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-2">
                            <InputOTP
                                maxLength={6}
                                value={value}
                                onChange={(value) => setValue(value)}
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>

                        </div>
                        <DialogFooter>
                            <Button type="button" onClick={handleRegister}>Register</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
        </div>

    );
};

export default Register;
