import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuUser2 } from "react-icons/lu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/service/userSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.userInfo);
    console.log(userInfo, "header");
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('accessToken');
        navigate('/login');
        console.log("Logged out")
    }
    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <Link to="/">
                <h1 className="text-2xl font-bold">YourPlace</h1>
            </Link>
            <nav className="flex space-x-4 mr-8">
                <Link to="/home">
                    <Button variant="outlined" color="white">Home</Button>
                </Link>
                <Link to="/dashboard">
                    <Button variant="outlined" color="white">Dashboard</Button>
                </Link>
                <Link to="#">
                    <Button variant="outlined" color="white">About</Button>
                </Link>
                <Link to="#">
                    <Button variant="outlined" color="white">Contact</Button>
                </Link>
                <Button onClick={() => navigate('/register')} className="">Signup</Button>
                <DropdownMenu >
                    <DropdownMenuLabel>{"User"}</DropdownMenuLabel>
                    <DropdownMenuTrigger className='border-slate-300 rounded-md border p-1 text-red-400'><LuUser2 className='text-2xl' /></DropdownMenuTrigger>
                    <DropdownMenuSeparator />
                    <DropdownMenuContent className="flex flex-col justify-center items-center">
                        <DropdownMenuItem>
                            <p className="block px-4 py-2 text-sm text-gray-700">{userInfo && userInfo.user?.email || "Shivam"}</p> {/* Replace with user name */}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Dashboard
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            {
                                userInfo ? (<Button onClick={handleLogout} className="">Logout</Button>) : (
                                    <Button onClick={() => navigate('/login')} className="">Login</Button>

                                )
                            }
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>
        </header>
    );
};

export default Header;
