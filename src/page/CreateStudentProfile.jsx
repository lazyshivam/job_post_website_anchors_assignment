import { Base_Url } from '@/config/config'; // Assuming Base_Url is defined in a config file
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Assuming toast is a notification library

const CreateStudentProfile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        resume: '',
        profilePic: '',
        location: '',
    });

    const navigate=useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Form validation (optional, consider using a validation library)
        if (!formData.name || !formData.email) {
            toast.warn('Please fill in all required fields (Name and Email)');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${Base_Url}/student/addDetails`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Assuming authentication is handled
                },
            });

            const res = await response.json();
            console.log(res);

            if (res.code === 200) {
                toast.success(res.message);
                navigate('/dashboard');
                setFormData({ // Clear form data
                    name: '',
                    email: '',
                    phone: '',
                    resume: '',
                    profilePic: '',
                    location: '',
                });
            } else if (res.code === 400 || res.status === 400) {
                toast.error(res.message);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error creating student profile:', error);
            toast.error('Error creating student profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center mt-20 justify-center h-full">
            <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
                <h2 className="text-2xl font-bold mb-4">Create Student Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="studentName" className="block text-sm font-bold mb-2">
                            Student Name:
                        </label>
                        <input
                            type="text"
                            id="studentName"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="studentEmail" className="block text-sm font-bold mb-2">
                            Student Email:
                        </label>
                        <input
                            type="email"
                            id="studentEmail"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="studentPhone" className="block text-sm font-bold mb-2">
                            Phone Number (Optional):
                        </label>
                        <input
                            type="text"
                            id="studentPhone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                            <label htmlFor="studentResume" className="block text-sm font-bold mb-2">
                                Resume Link (Optional):
                            </label>
                            <input
                                type="text"
                                id="studentResume"
                                name="resume"
                                value={formData.resume}
                                onChange={handleChange}
                                className="px-4 py-2 border rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="studentProfilePic" className="block text-sm font-bold mb-2">
                                Profile Picture Link (Optional):
                            </label>
                            <input
                                type="text"
                                id="studentProfilePic"
                                name="profilePic"
                                value={formData.profilePic}
                                onChange={handleChange}
                                className="px-4 py-2 border rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="studentLocation" className="block text-sm font-bold mb-2">
                                Location (Optional):
                            </label>
                            <input
                                type="text"
                                id="studentLocation"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="px-4 py-2 border rounded w-full"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            {isLoading ? 'Please wait...' : 'Create Profile'}
                        </button>
                </form>
            </div>
        </div>
    );
};

export default CreateStudentProfile;
