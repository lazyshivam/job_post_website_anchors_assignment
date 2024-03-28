import { Button } from '@/components/ui/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();



  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Error: Unauthorized Access</h1>
      <p className="text-lg text-gray-700 mb-4">You are not authorized to view this page.</p>
      <Button className="" onClick={()=>  navigate('/login')}>Go to Login</Button>
    </div>
  );
};

export default Error;
