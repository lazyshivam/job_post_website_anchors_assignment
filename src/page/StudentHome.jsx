import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useDispatch } from 'react-redux';
import { logout } from '@/service/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Base_Url } from '@/config/config';

const StudentHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [postedJobs, setPostedJobs] = useState([
    ]);

    const getCompanyDetails = async () => {
        setIsLoading(true);


        try {

            const response = await fetch(`${Base_Url}/company/getAllJob`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    
                }
            });

            const res = await response.json();
            console.log(res);
            if (res.code === 200) {

                // toast.success(res.message)
                setPostedJobs(res.data);

                console.log(postedJobs,"company posted jobs")

            } else if (res.code === 400 || res.status === 400) {
            
                toast.error(res.message)
            }
        } catch (error) {
            console.error('Error fetching  job:', error);
            toast.error('Error in fetching job profile. Please try again.');
            // navigate('/login');
            // localStorage.removeItem('accessToken');
            // dispatch(logout());
            
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCompanyDetails();
    }, [])
    const handleApplyJob = async(id,companyId) => {
      setIsLoading(true);
      console.log(id)
    
      try {

        const response = await fetch(`${Base_Url}/student/apply/${companyId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ role: id, amountSpent: 10 }),
          });

          const res = await response.json();
          console.log(res);
          if (res.code === 200) {

              toast.success('Job successfully applied, Go to your dashboard')
              // setPostedJobs(res.data);
              // navigate('/dashboard');
              console.log(res,"applied")

          } else if (res.code === 400 || res.status === 400) {
          
              toast.error(res.message)
          }
      } catch (error) {
          console.error('Error apply  job:', error);
          toast.error('Error in apply job profile. Please try again.');
          // navigate('/login');
          // localStorage.removeItem('accessToken');
          // dispatch(logout());
          
      } finally {
          setIsLoading(false);
      }
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Posted Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {postedJobs.map(job => (
                    <Card key={job.id} className="shadow-md p-4">
                        <CardHeader> 
                            <CardTitle className="text-xl font-bold mb-2">{job.jobRole}</CardTitle>
                        </CardHeader>
                        <CardContent>

                        <p><span className="font-bold">Company:</span> {job?.company?.name}</p>
                        <a href={job?.company?.website} target="_blank" rel="noopener noreferrer"><span className="font-bold">Website:</span> {job?.company?.website}</a>

                            <p><span className="font-bold">Location:</span> {job.location}</p>
                            <p><span className="font-bold">Min CTC:</span> {job.minCTC} Lac</p>
                            <p><span className="font-bold">Max CTC:</span> {job.maxCTC} Lac</p>
                        </CardContent>
                        <CardFooter><div className="mt-4">
                            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleApplyJob(job.id,job?.company?.id)}>Apply </button>
                        </div></CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default StudentHome;
