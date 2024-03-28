import { Base_Url } from '@/config/config';
import {cities} from '@/config/cities';
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


const CompanyDashboard = () => {
    const [hasProfile, setHasProfile] = useState(false);
    const [showJobPostingForm, setShowJobPostingForm] = useState(false);
    const [companyProfile, setCompanyProfile] = useState([]);
    const navigate = useNavigate();



    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        jobRole: '',
        location: '',
        minCTC: '',
        maxCTC: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!formData.jobRole || !formData.location || !minCTC || !maxCTC) {
            toast.warn("Please fill the form data");
            return;
        }
        // company/postJob/6600adb45bc5d8b6c00ef376
        // setIsLoading(true);
        console.log(FormData, "JOb Form")
        try {

            const response = await fetch(`${Base_Url}/company/postJob/${companyProfile[0].id}`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            const res = await response.json();
            console.log(res);
            if (res.code === 200) {

                toast.success(res.message)
                navigate('/');

            } else if (res.code === 400) {
                toast.warn(res.message);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error fetching company profile:', error);
            toast.error('Error in fetching company profile. Please try again.');
        } finally {
            setIsLoading(false);
            setFormData({
                jobRole: '',
                location: '',
                minCTC: '',
                maxCTC: ''
            });
        }

    };


    const getCompanyDetails = async () => {
        setIsLoading(true);


        try {

            const response = await fetch(`${Base_Url}/company/getCompanyDetails`, {
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
                setCompanyProfile(res.data);

            } else if (res.code === 400 || res.status === 400) {

                toast.error(res.message)
            }
        } catch (error) {
            console.error('Error fetching company profile:', error);
            toast.error('Error in fetching company profile. Please try again.');
            // navigate('/login');
            // localStorage.removeItem('accessToken');

        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCompanyDetails();
    }, []);



    return (
        <div className="container w-screen mx-auto mt-8">
            {companyProfile.length === 0 ? (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Welcome to Your Company Dashboard</h2>
                    <p>You haven't created a company profile yet.</p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={() => navigate('/createProfile')}>Create Profile</button>
                </div>
            ) : (
                <div className='space-y-10'>
                    <h2 className="text-2xl font-bold  my-4">Company Profile</h2>
                    <div className="flex items-center space-x-5 mb-4">
                        <img src={companyProfile[0].logo || 'https://picsum.photos/200'} alt="Company Logo" className="w-16 h-16 rounded-full mr-4" />
                        <div>
                            <h1 className="text-xl font-bold">{companyProfile[0].name}</h1>
                            <p className="text-gray-500">{companyProfile[0].website}</p>
                        </div>
                    </div>
                    <div className=''>
                        <p><span className="font-bold">Team Size:</span> {companyProfile[0].teamSize}</p>
                        <p><span className="font-bold">Rupees:</span> {companyProfile[0].rupees}</p>
                    </div>


                    <div className="space-x-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4">Post Job</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Post your job</DialogTitle>
                                    <DialogDescription>
                                        Post job details. Click submit when you're done.
                                    </DialogDescription>
                                </DialogHeader>

                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
                                    <form >
                                        <div className="mb-4">
                                            <label htmlFor="roleName" className="block text-sm font-bold mb-2">Role Name:</label>
                                            <input type="text" id="roleName" placeholder='Enter job role' name="jobRole" value={formData.jobRole} onChange={handleChange} className="px-4 py-2 border rounded w-full" required />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="location" className="block text-sm font-bold mb-2">Location:</label>
                                            <select
                                                id="location"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                className="px-4 py-2 border rounded w-full"
                                                required
                                            >
                                                <option value="">Select Location</option>
                                                {cities.map((city,index) => (
                                                    <option key={`city-${index}`} value={city}>
                                                    {city}
                                                  </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="minCTC" className="block text-sm font-bold mb-2">Min CTC (in Lac):</label>
                                            <input type="number" placeholder='Enter min ctc' id="minCTC" name="minCTC" value={formData.minCTC} onChange={handleChange} className="px-4 py-2 border rounded w-full" required />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="maxCTC" className="block text-sm font-bold mb-2">Max CTC (in Lac):</label>
                                            <input type="number" placeholder='Enter max ctc' id="maxCTC" name="maxCTC" value={formData.maxCTC} onChange={handleChange} className="px-4 py-2 border rounded w-full" required />
                                        </div>
                                        {/* <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Post Job</button> */}
                                    </form>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" onClick={handleSubmit}>{isLoading ? 'Please wait..' : 'Post Job'}</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Button className="bg-teal-500 hover:bg-teal-600 text-white "
                            onClick={() => navigate('/')}>See Your Posted Job</Button>
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
                                    {companyProfile[0].transactionHistory.map((transaction, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">{transaction.type}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{transaction.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{moment(transaction.date).format('YYYY-MM-DD HH:mm:ss')}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{transaction.reason}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            )}

        </div>
    );
}

export default CompanyDashboard;
