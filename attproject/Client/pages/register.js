import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/authSlice';
import LandingHeader from '@/components/layout/LandingHeader';
import { ArrowPathIcon } from '@heroicons/react/20/solid'


import Link from 'next/link';
import Image from 'next/image';


function Register() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        password_confirmation: '',
    });
    const isLoading = useSelector((state) => state.auth.isLoading);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(formData));
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (

        <section className="min-h-screen grid grid-cols-12">
            <div className="hidden lg:grid col-span-6 bg-cover bg-[url('/assets/svg/bg.svg')] rotate-180" />
            <div className="grid col-span-12 lg:col-span-6 items-center ">
                <div className="w-3/4 flex flex-col items-center mx-auto">
                    <Image width={100} height={100} src={'/assets/images/logo.png'} />
                    <h1 className="mt-4 mb-4 text-xl font-bold text-left text-gray-900">Sign up</h1>
                    <h6>Create your AT&T account</h6>
                    <form onSubmit={handleSubmit} className="pb-1 space-y-4 w-full">

                        <label className="block">
                            <span className="block mb-1 text-xs font-medium text-gray-600 "> Email</span>
                            <input
                                value={formData.email}
                                onChange={handleChange}
                                name="email"
                                className="w-full px-3 py-3 rounded-lg bg-gray-50 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-800  border-2"
                                type="email"
                                placeholder="Ex. james@gmail.com"
                                required />
                        </label>
                        <label className="block">
                            <span className="block mb-1 text-xs font-medium text-gray-600 "> Name</span>
                            <input
                                value={formData.name}
                                onChange={handleChange}
                                name="name"
                                className="w-full px-3 py-3 rounded-lg bg-gray-50 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-800  border-2"
                                type="text"
                                placeholder="enter  name"
                                required />
                        </label>
                        <label className="block">
                            <span className="block mb-1 text-xs font-medium text-gray-600 "> Password</span>
                            <input
                                value={formData.password}
                                onChange={handleChange}
                                name="password"
                                className="w-full px-3 py-3 rounded-lg bg-gray-50 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-800  border-2"
                                type="password"
                                placeholder="******************"
                                required />
                        </label>

                        <label className="block">
                            <span className="block mb-1 text-xs font-medium text-gray-600 ">Confirm  Password</span>
                            <input
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                name="password_confirmation"
                                className="w-full px-3 py-3 rounded-lg bg-gray-50 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-800  border-2"
                                type="password"
                                placeholder="******************"
                                required />
                        </label>
                        <button
                            type="submit"
                            disabled={!formData.email || !formData.password || !formData.password_confirmation || isLoading}
                            className="btn btn-primary mt-6 px-10">
                            {isLoading ? <ArrowPathIcon className="w-6 h-6" /> : "Sing up"}
                        </button>
                    </form>


                    <div className="my-6 space-y-2">
                        <p className="text-xs text-gray-600">
                            Already have an Account?
                            <Link href="/login" className="text-accent hover:text-black"> Sign in</Link>
                        </p>

                    </div>
                </div>
            </div>

        </section>)
    // <>

    //     <section className="grid grid-cols-1 lg:grid-cols-2 bg-white">
    //         <div className="w-full px-4 mx-auto md:py-6 xl:py-12 md:w-3/5 lg:w-4/5 xl:w-3/5">
    //             <h1 className="mb-4 -mt-3 text-2xl font-extrabold leading-snug tracking-tight text-left  text-gray-900 md:text-4xl">Sign up </h1>

    //             <form onSubmit={handleSubmit} className="mt-8 space-y-4">

    //                 <label className="block">
    //                     <span className="block mb-1 text-xs font-medium text-gray-600 "> Email</span>
    //                     <input
    //                         value={formData.email}
    //                         onChange={handleChange}
    //                         name="email"
    //                         className="w-full border rounded p-1 placeholder:text-sm rounded-lg bg-gray-50 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-800  border-2"
    //                         type="email"
    //                         placeholder="Ex. james@gmail.com"
    //                         required />
    //                 </label>
    //                 <label className="block">
    //                     <span className="block mb-1 text-xs font-medium text-gray-600 "> Name</span>
    //                     <input
    //                         value={formData.name}
    //                         onChange={handleChange}
    //                         name="name"
    //                         className="w-full border rounded p-1 placeholder:text-sm rounded-lg bg-gray-50 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-800  border-2"
    //                         type="text"
    //                         placeholder="enter  name"
    //                         required />
    //                 </label>
    //                 <label className="block">
    //                     <span className="block mb-1 text-xs font-medium text-gray-600 "> Password</span>
    //                     <input
    //                         value={formData.password}
    //                         onChange={handleChange}
    //                         name="password"
    //                         className="w-full border rounded p-1 placeholder:text-sm rounded-lg bg-gray-50 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-800  border-2"
    //                         type="password"
    //                         placeholder="******************"
    //                         required />
    //                 </label>

    //                 <label className="block">
    //                     <span className="block mb-1 text-xs font-medium text-gray-600 ">Confirm  Password</span>
    //                     <input
    //                         value={formData.password_confirmation}
    //                         onChange={handleChange}
    //                         name="password_confirmation"
    //                         className="w-full border rounded p-1 placeholder:text-sm rounded-lg bg-gray-50 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-800  border-2"
    //                         type="password"
    //                         placeholder="******************"
    //                         required />
    //                 </label>
    //                 <button
    //                     type="submit"
    //                     disabled={!formData.email || !formData.password || !formData.password_confirmation || isLoading}
    //                     className="flex justify-center items-center w-full disabled:bg-red-400 bg-red-600 text-white rounded py-2 ">
    //                     {isLoading ? <ArrowPathIcon className="w-6 h-6" /> : " Register"}
    //                 </button>
    //             </form>
    //             <div className="pt-6 mt-6 text-sm font-medium text-gray-600 border-t border-gray-200 ">
    //                 Already have an account?
    //                 <Link href="login" className="text-red-600 hover:text-red-900">Sign Up </Link>
    //             </div>
    //         </div>
    //         <div className="px-4  space-y-10 bg-gray-100 md:py-10 xs:py-6 xl:py-20 md:px-40 lg:px-20 xl:px-40">

    //             <div className="flex space-x-3">
    //                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-none w-6 h-6 mt-1 text-red-600">
    //                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    //                 </svg>
    //                 <div>
    //                     <h2 className="text-xl font-medium text-red-600">Free account</h2>
    //                     <p className="mt-1 text-gray-600">Create apps, connect databases and add-on services, and collaborate on  apps, for free.</p>
    //                 </div>
    //             </div>
    //             <div className="flex space-x-3">
    //                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-none w-6 h-6 mt-1 text-red-600">
    //                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    //                 </svg>
    //                 <div>
    //                     <h2 className="text-xl font-medium text-red-600"> app platform</h2>
    //                     <p className="mt-1 text-gray-600">A platform for apps, with app management & instant scaling, for development and production.</p>
    //                 </div>
    //             </div>
    //             <div className="flex space-x-3">
    //                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-none w-6 h-6 mt-1 text-red-600">
    //                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    //                 </svg>
    //                 <div>
    //                     <h2 className="text-xl font-medium text-red-600">Deploy now</h2>
    //                     <p className="mt-1 text-gray-600">Go from code to running app in minutes. Deploy, scale, and deliver  app to the world.</p>
    //                 </div>
    //             </div>
    //             <div className="flex space-x-3">
    //                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-none w-6 h-6 mt-1 text-red-600">
    //                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    //                 </svg>
    //                 <div>
    //                     <h2 className="text-xl font-medium text-red-600">Free account</h2>
    //                     <p className="mt-1 text-gray-600">Create apps, connect databases and add-on services, and collaborate on  apps, for free.</p>
    //                 </div>
    //             </div>
    //         </div>
    //     </section>
    // </>
    // );
}

export default Register;
