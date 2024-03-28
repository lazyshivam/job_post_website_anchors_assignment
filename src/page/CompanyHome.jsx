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
import { Button } from '@/components/ui/button';

const CompanyHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [postedJobs, setPostedJobs] = useState([
    ]);

    const getCompanyDetails = async () => {
        setIsLoading(true);


        try {

            const response = await fetch(`${Base_Url}/company/getJob`, {
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
    const handleDeleteJob = (id) => {
        // Implement deletion logic here, such as another API request to delete the job
        console.log(`Deleting job with id ${id}`);
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Posted Jobs</h2>
            {postedJobs.length === 0 ? (
                <div className="text-center">
                    <p className="text-gray-600">No jobs posted yet.</p>
                    <Button
                        onClick={() => navigate('/dashboard')}
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white "
                    >
                        Go to Dashboard
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {postedJobs.map(job => (
                        <Card key={job.id} className="shadow-md p-4">
                            <CardHeader> 
                                <CardTitle className="text-xl font-bold mb-2">{job.jobRole}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p><span className="font-bold">Location:</span> {job.location}</p>
                                <p><span className="font-bold">Min CTC:</span> {job.minCTC} Lac</p>
                                <p><span className="font-bold">Max CTC:</span> {job.maxCTC} Lac</p>
                            </CardContent>
                            <CardFooter>
                                <div className="mt-4">
                                    <Button
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handleDeleteJob(job.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CompanyHome;
