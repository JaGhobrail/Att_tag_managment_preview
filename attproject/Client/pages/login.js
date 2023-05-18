import LandingHeader from "@/components/layout/LandingHeader";
import React, { useState } from "react";
import { ArrowPathIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import {  useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, reset_signup_success } from "../store/auth/actions";
import { useRouter } from "next/router";

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(reset_signup_success());
    }
  }, [dispatch]);

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(login(email, password));
    }
  };

  if (typeof window !== "undefined" && isAuthenticated) {
    router.push("/dashboard");
  }



  return (
    <>
     <LandingHeader />
     <section className="grid grid-cols-12 gap-0 lg:grid-cols-12">
            <div className="w-full col-span-12 p-4 mx-auto mt-6 lg:col-span-12 xl:p-12 md:w-2/6">
                
                <h1 className="mt-4 mb-4 text-xl font-light text-left text-gray-900">Log in to your account</h1>
                <form onSubmit={handleSubmit} className="pb-1 space-y-4">
                    <label className="block">
                        <span className="block mb-1 text-sm font-medium text-gray-600">Your Email</span>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            onChange={onChange}
                            value={email}
                            className="w-full px-3 py-3 rounded-lg bg-gray-50 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-800  border-2" 
                            placeholder="Ex. james@gmail.com" 
                            inputMode="email" 
                            required />
                    </label>
                    <label className="block">
                        <span className="block mb-1 text-sm font-medium text-gray-600">Your Password</span> 
                        <input 
                            value={password} 
                            name="password"

                            onChange={onChange}
                            className="w-full px-3 py-3 rounded-lg bg-gray-50 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-800 border-2" 
                            type="password" 
                            placeholder="*********************" 
                            required />   
                    </label>
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox" />
                        <span className="block ml-2 text-sm font-medium text-gray-600 cursor-pointer">Remember me</span>
                    </label>
                    <button 
                        type="submit" 
                        disabled={ !email || !password || loading}
                        className="bg-red-600 text-white font-bold text-md rounded p-2 disabled:bg-red-400 ">
                        {loading ? <ArrowPathIcon className="w-6 h-6" /> : " Login"}
                    </button>
                    </div>
                </form>
                <div className="my-6 space-y-2">
                <p className="text-xs text-gray-600">
                    Dont have an account
                    <Link href="/register" className="text-red-600 hover:text-black">Create an account</Link>
                </p>
                
                </div>
            </div>
        </section>
  
    </>
  );
};

export default LoginPage;
