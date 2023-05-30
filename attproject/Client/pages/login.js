import LandingHeader from "@/components/layout/LandingHeader";
import React, { useState } from "react";
import { ArrowPathIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, reset_signup_success } from "../store/auth/actions";
import { useRouter } from "next/router";
import Image from "next/image";

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
        <section className="min-h-screen grid grid-cols-12">
            <div className="grid col-span-12 items-center lg:col-span-6">
                <div className="w-3/4 flex flex-col items-center mx-auto">
                    <Image width={100} height={100} src={'/assets/images/logo.png'} />

                    <h1 className="mt-4 mb-4 text-xl font-bold text-left text-gray-900">Sign In</h1>
                    <h6>Sign in to stay connected.</h6>
                    <form onSubmit={handleSubmit} className="pb-1 space-y-4 w-full">

                        <label className="block w-full">
                            <span className="block mb-1 text-sm font-medium text-gray-600">Email</span>
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
                        <label className="block w-full">
                            <span className="block mb-1 text-sm font-medium text-gray-600">Password</span>
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

                            <Link href="/register" className="text-accent hover:text-black">Forgot Password</Link>
                        </div>

                        <button
                            type="submit"
                            disabled={!email || !password || loading}
                            className="btn btn-primary px-10 ">
                            {loading ? <ArrowPathIcon className="w-6 h-6" /> : "Sing in"}
                        </button>
                    </form>

                    <div className="my-6 space-y-2">
                        <p className="text-xs text-gray-600">
                            Don’t have an account?
                            <Link href="/register" className="text-accent hover:text-black"> Create an account</Link>
                        </p>

                    </div>
                </div>
            </div>
            <div className="hidden  lg:grid col-span-6 bg-cover bg-[url('/assets/svg/bg.svg')]">
                {/* <img className="object-center w-full h-full" src={'/assets/svg/bg.svg'} /> */}
            </div>
        </section>

    );
};

export default LoginPage;
