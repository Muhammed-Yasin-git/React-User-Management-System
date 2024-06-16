import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../slices/userSlice/usersApiSlice';
import Loader from '../../components/userComponent/Loader';
import { toast } from 'react-toastify';
import { setCredentials } from '../../slices/userSlice/authSlice';
import Header from '../../components/userComponent/Header';

export const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth)

    const [register, { isLoading }] = useRegisterMutation()

    useEffect(() => {
        if (userInfo) {
            navigate('/home')
        }
    }, [navigate, userInfo])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }))
                navigate('/home')
                toast.success('Signed In')
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }

        }

    };

    return (
        <>
        <Header/>
            <div className="py-16">
                <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                    <div className="w-full p-8 lg:w-1/2">
                        <h2 className="text-2xl font-semibold text-gray-700 text-center">SIGN UP</h2>
                        <p className="text-xl text-gray-600 text-center">Welcome back!</p>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                                <input value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" />
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email" />
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" />
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" />
                            </div>
                            <div className="mt-8">
                                <button type='submit' className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">SignUp</button>
                            </div>
                        </form>
                        <div className="mt-4 flex items-center justify-between">
                            <Link to='/'>
                                <span className="border-b w-1/5 md:w-1/4">Already registered? </span>
                                <span className="text-xs underline text-red-500 uppercase">Login</span>
                                <span className="border-b w-1/5 md:w-1/4"></span>
                            </Link>
                        </div>
                        {isLoading && <Loader />}
                    </div>
                    <div className="lg:w-1/2 bg-cover hidden lg:block" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506456331400-7088248a8db1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3wyNTQxMTI3fHxlbnwwfHx8fHw%3D')" }}>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;