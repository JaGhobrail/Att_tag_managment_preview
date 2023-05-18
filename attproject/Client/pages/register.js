import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/authSlice';
import LandingHeader from '@/components/layout/LandingHeader';
import { ArrowPathIcon } from '@heroicons/react/20/solid'


import Link from 'next/link';


function Register() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    name:'',
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
    <>
      <LandingHeader />

      <section className="grid grid-cols-1 lg:grid-cols-2 bg-white  dark:bg-gray-800">
          <div className="w-full px-4 mx-auto md:py-6 xl:py-12 md:w-3/5 lg:w-4/5 xl:w-3/5">
          <h1 className="mb-4 -mt-3 text-2xl font-extrabold leading-snug tracking-tight text-left dark:text-emerald-300 text-gray-900 md:text-4xl">Sign up </h1>
          <div className="mt-8 space-y-10">
              <div className="grid grid-cols-2 gap-4">
              <a href="#" className="my-3 flex bg-blue-500 text-white justify-center items-center rounded py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                  <path
                      d="M20.283,10.356h-8.327v3.451h4.792c-0.446,2.193-2.313,3.453-4.792,3.453c-2.923,0-5.279-2.356-5.279-5.28	c0-2.923,2.356-5.279,5.279-5.279c1.259,0,2.397,0.447,3.29,1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233	c-4.954,0-8.934,3.979-8.934,8.934c0,4.955,3.979,8.934,8.934,8.934c4.467,0,8.529-3.249,8.529-8.934	C20.485,11.453,20.404,10.884,20.283,10.356z"
                  />
                  </svg>
                  <span className="sr-only">Continue with</span> Google
              </a>
              <a href="#" className="my-3 flex bg-black text-white justify-center items-center rounded py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                  <path
                      d="M19.665,16.811c-0.287,0.664-0.627,1.275-1.021,1.837c-0.537,0.767-0.978,1.297-1.316,1.592	c-0.525,0.482-1.089,0.73-1.692,0.744c-0.432,0-0.954-0.123-1.562-0.373c-0.61-0.249-1.17-0.371-1.683-0.371	c-0.537,0-1.113,0.122-1.73,0.371c-0.616,0.25-1.114,0.381-1.495,0.393c-0.577,0.025-1.154-0.229-1.729-0.764	c-0.367-0.32-0.826-0.87-1.377-1.648c-0.59-0.829-1.075-1.794-1.455-2.891c-0.407-1.187-0.611-2.335-0.611-3.447	c0-1.273,0.275-2.372,0.826-3.292c0.434-0.74,1.01-1.323,1.73-1.751C7.271,6.782,8.051,6.563,8.89,6.549	c0.46,0,1.063,0.142,1.81,0.422s1.227,0.422,1.436,0.422c0.158,0,0.689-0.167,1.593-0.498c0.853-0.307,1.573-0.434,2.163-0.384	c1.6,0.129,2.801,0.759,3.6,1.895c-1.43,0.867-2.137,2.08-2.123,3.637c0.012,1.213,0.453,2.222,1.317,3.023	c0.392,0.372,0.829,0.659,1.315,0.863C19.895,16.236,19.783,16.529,19.665,16.811L19.665,16.811z M15.998,2.38	c0,0.95-0.348,1.838-1.039,2.659c-0.836,0.976-1.846,1.541-2.941,1.452c-0.014-0.114-0.021-0.234-0.021-0.36	c0-0.913,0.396-1.889,1.103-2.688c0.352-0.404,0.8-0.741,1.343-1.009c0.542-0.264,1.054-0.41,1.536-0.435	C15.992,2.127,15.998,2.254,15.998,2.38L15.998,2.38z"
                  />
                  </svg>
                  <span className="sr-only ">Continue with</span> Apple
              </a>
              </div>
              <div className="text-center border-b border-gray-200" style={{lineHeight: '0'. px}}>
              <span className="p-2 text-xs font-semibold tracking-wide text-gray-600 uppercase bg-white" style={{lineHeight: '0'. px}}>Or</span>
              </div>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          
              <label className="block">
              <span className="block mb-1 text-xs font-medium text-gray-600 dark:text-emerald-300">Your Email</span>
              <input 
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  className="w-full border rounded p-1 placeholder:text-sm rounded-lg bg-gray-50 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-800  border-2" 
                  type="email" 
                  placeholder="Ex. james@gmail.com" 
                  required />
              </label>
              <label className="block">
              <span className="block mb-1 text-xs font-medium text-gray-600 dark:text-emerald-300">Your Name</span>
              <input 
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                  className="w-full border rounded p-1 placeholder:text-sm rounded-lg bg-gray-50 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-800  border-2" 
                  type="text" 
                  placeholder="enter your name" 
                  required />
              </label>
              <label className="block">
              <span className="block mb-1 text-xs font-medium text-gray-600 dark:text-emerald-300">Your Password</span>
              <input 
                  value={formData.password}
                  onChange={handleChange}
                  name="password"
                  className="w-full border rounded p-1 placeholder:text-sm rounded-lg bg-gray-50 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-800  border-2" 
                  type="password" 
                  placeholder="******************" 
                  required />
              </label>
              
              <label className="block">
              <span className="block mb-1 text-xs font-medium text-gray-600 dark:text-emerald-300">Confirm your Password</span>
              <input 
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  name="password_confirmation"
                  className="w-full border rounded p-1 placeholder:text-sm rounded-lg bg-gray-50 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-800  border-2" 
                  type="password" 
                  placeholder="******************" 
                  required />
              </label>
              <button 
                  type="submit" 
                  disabled={ !formData.email || !formData.password || !formData.password_confirmation || isLoading}
                  className="flex justify-center items-center w-full disabled:bg-red-400 bg-red-600 text-white rounded py-2 ">
                  {isLoading ? <ArrowPathIcon className="w-6 h-6" /> : " Register"}
              </button>
          </form>
          <div className="pt-6 mt-6 text-sm font-medium text-gray-600 border-t border-gray-200 dark:text-emerald-300">
              Already have an account?
              <Link href="login" className="text-red-600 hover:text-red-900">Sign Up </Link>
          </div>
          </div>
          <div className="px-4  space-y-10 bg-gray-100 md:py-10 xs:py-6 xl:py-20 md:px-40 lg:px-20 xl:px-40">
          
          <div className="flex space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-none w-6 h-6 mt-1 text-red-600">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
              <h2 className="text-xl font-medium text-red-600">Free account</h2>
              <p className="mt-1 text-gray-600">Create apps, connect databases and add-on services, and collaborate on your apps, for free.</p>
              </div>
          </div>
          <div className="flex space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-none w-6 h-6 mt-1 text-red-600">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
              <h2 className="text-xl font-medium text-red-600">Your app platform</h2>
              <p className="mt-1 text-gray-600">A platform for apps, with app management & instant scaling, for development and production.</p>
              </div>
          </div>
          <div className="flex space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-none w-6 h-6 mt-1 text-red-600">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
              <h2 className="text-xl font-medium text-red-600">Deploy now</h2>
              <p className="mt-1 text-gray-600">Go from code to running app in minutes. Deploy, scale, and deliver your app to the world.</p>
              </div>
          </div>
          <div className="flex space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-none w-6 h-6 mt-1 text-red-600">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
              <h2 className="text-xl font-medium text-red-600">Free account</h2>
              <p className="mt-1 text-gray-600">Create apps, connect databases and add-on services, and collaborate on your apps, for free.</p>
              </div>
          </div>
          </div>
      </section>
      {/* <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Register'}
        </button>
      </form> */}
    </>
  );
}

export default Register;
