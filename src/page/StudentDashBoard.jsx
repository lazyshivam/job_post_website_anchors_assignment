import { Base_Url } from '@/config/config';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import moment from 'moment';
// import CompanyProfileForm from './CompanyProfileForm'; // Assuming you have a CompanyProfileForm component
// import JobPostingForm from './JobPostingForm'; // Assuming you have a JobPostingForm component
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"


const StudentDashboard = () => {
  const [hasProfile, setHasProfile] = useState(false);
  const [studentProfile, setStudentProfile] = useState([]);
  const navigate = useNavigate();


  const [isLoading, setIsLoading] = useState(false);


  const getStudentDetails = async () => {
    setIsLoading(true);


    try {

      const response = await fetch(`${Base_Url}/student/getDetails`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      const res = await response.json();
      console.log(res);
      if (res.code === 200) {

        // toast.success(res.message)
        setStudentProfile(res.data);
        console.log(studentProfile);

      } else if (res.code === 400 || res.status === 400) {

        toast.error(res.message)
      }
    } catch (error) {
      console.error('Error fetching stutend profile:', error);
      toast.error('Error in fetching student profile. Please try again.');
      // navigate('/login');
      // localStorage.removeItem('accessToken');

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStudentDetails();
  }, [])

  return (
    <div className="container w-screen  mx-auto mt-8">
      {studentProfile.length === 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Welcome to Your Student Dashboard</h2>
          <p>You haven't created a student profile yet.</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => navigate('/createProfile')}>Create Profile</button>
        </div>
      ) : (
        <div className='space-y-10'>
          <h2 className="text-2xl font-bold  my-4">Student Profile</h2>
          <div className="flex items-center space-x-5 mb-4">
            <img src={studentProfile[0].profilePic || 'https://picsum.photos/200'} alt="Company Logo" className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h1 className="text-xl font-bold">{studentProfile[0].name}</h1>
              <p className="text-gray-500">{studentProfile[0].location}</p>
            </div>
          </div>
          <div className=''>
            <p><span className="font-bold">Resume:</span> {studentProfile[0].resume}</p>
            <p><span className="font-bold">Phone:</span> {studentProfile[0].phone}</p>
            <p><span className="font-bold">Rupess:</span> {studentProfile[0].rupees}</p>

          </div>
          <div className="space-x-4">

            <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => navigate('/')}>See Posted Job</button>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Rupees Transaction History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Loop through transaction history and render rows */}
                  {studentProfile[0].transactionHistory && studentProfile[0].transactionHistory.map((transaction, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{transaction.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{transaction.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{moment(transaction.date).format('YYYY-MM-DD HH:mm:ss')}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{transaction.reason}</td>
                    </tr>
                  ))}
                    {!studentProfile[0].transactionHistory && <div>
                      <h1 className='text-xl'>Not Found</h1>
                  </div>}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}


    </div>
  );
}

export default StudentDashboard;
