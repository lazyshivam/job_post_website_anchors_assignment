import { Base_Url } from '@/config/config';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateCompanyProfileForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        website: '',
        teamSize: '',
        logo: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Perform form validation
        if (!formData.name || !formData.website || !formData.teamSize || !formData.logo) {
            toast.warn('Please fill in all fields.')
            return;
        }
        console.log(formData);
      

        try {
            // Make API request
            const response = await fetch(`${Base_Url}/company/addCompanyDetails`, {
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
                console.log("Profile details added",res)
                toast.success("Profile created successfully")
                navigate('/dashboard');
                // Clear form data
                setFormData({
                    name: '',
                    website: '',
                    teamSize: '',
                    logo: '',
                });
            } else if (res.code === 400 ||res.status===400) {
                // Handle error
                toast.error(res.message)
            }
        } catch (error) {
            console.error('Error creating company profile:', error);
            toast.error('Error creating company profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center mt-20 justify-center h-full">
            <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
                <h2 className="text-2xl font-bold mb-4">Create Company Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="companyName" className="block text-sm font-bold mb-2">Company Name:</label>
                        <input type="text" id="companyName" name="name" value={formData.name} onChange={handleChange} className="px-4 py-2 border rounded w-full" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="websiteLink" className="block text-sm font-bold mb-2">Website Link:</label>
                        <input type="text" id="websiteLink" name="website" value={formData.website} onChange={handleChange} className="px-4 py-2 border rounded w-full" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="teamSize" className="block text-sm font-bold mb-2">Team Size:</label>
                        <select id="teamSize" name="teamSize" value={formData.teamSize} onChange={handleChange} className="px-4 py-2 border rounded w-full">
                            <option value="">Select Team Size</option>
                            <option value="1-10">1-10</option>
                            <option value="11-50">11-50</option>
                            <option value="50+">More than 50</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="companyLogo" className="block text-sm font-bold mb-2">Company Logo:</label>
                        <input type="text" id="companyLogo" placeholder='Enter logo url' value={formData.logo} name="logo" onChange={handleChange} className="px-4 py-2 border rounded w-full" />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">{isLoading ? 'Please wait..' : 'Create Profile'}</button>
                </form>
            </div>
        </div>
    );
}

export default CreateCompanyProfileForm;
