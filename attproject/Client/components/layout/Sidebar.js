import OutsideClick from "../../utils/outsideClick";

import React, { useRef } from "react";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
// import { Context } from '../../context';
import { useRouter } from "next/router";
import Link from "next/link";
import { logout } from "@/store/auth/actions";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";
const Sidebar = ({ mobileNavsidebar }) => {
    const dispatch = useDispatch();
    // const {state,dispatch} = useContext(Context);
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);



    const logoutHandler = () => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(logout());
            if (!isAuthenticated) {
                router.push('login')
            }

        }


    };
    return (
        <aside className=" w-1/6 py-10 pl-10 bg-gray-900 h-screen overflow-y-scroll min-w-min lg:fixed border-r border-gray-300 dark:border-zinc-700  hidden md:block ">
            <div className=" font-bold text-lg flex items-center gap-x-3">
                <svg
                    className="h-8 w-8 fill-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path d="M10 15.5v-7c0-.41.47-.65.8-.4l4.67 3.5c.27.2.27.6 0 .8l-4.67 3.5c-.33.25-.8.01-.8-.4Zm11.96-4.45c.58 6.26-4.64 11.48-10.9 10.9 -4.43-.41-8.12-3.85-8.9-8.23 -.26-1.42-.19-2.78.12-4.04 .14-.58.76-.9 1.31-.7v0c.47.17.75.67.63 1.16 -.2.82-.27 1.7-.19 2.61 .37 4.04 3.89 7.25 7.95 7.26 4.79.01 8.61-4.21 7.94-9.12 -.51-3.7-3.66-6.62-7.39-6.86 -.83-.06-1.63.02-2.38.2 -.49.11-.99-.16-1.16-.64v0c-.2-.56.12-1.17.69-1.31 1.79-.43 3.75-.41 5.78.37 3.56 1.35 6.15 4.62 6.5 8.4ZM5.5 4C4.67 4 4 4.67 4 5.5 4 6.33 4.67 7 5.5 7 6.33 7 7 6.33 7 5.5 7 4.67 6.33 4 5.5 4Z"></path>
                </svg>
                <div className="tracking-wide text-white dark:text-white">
                    Tags <span className="text-red-600">.</span>
                </div>
            </div>

            <div className="mt-12 flex flex-col gap-y-4 text-gray-300 fill-gray-500 text-sm">
                <div className="text-gray-400/70  font-medium uppercase">Menu</div>
                <Link
                    href="/dashboard"
                    className={
                        router.pathname == "/dashboard"
                            ? "flex items-center space-x-2 py-3  dark:text-white  pr-20 border-r-4 border-r-red-600 font-semibold "
                            : "flex items-center space-x-2 py-3  dark:text-white hover:border-r-4 hover:border-r-red-600  hover:font-semibold pr-20"
                    }
                >
                    <svg
                        className={
                            router.pathname == "/dashboard"
                                ? "h-5 w-5 fill-red-600"
                                : "h-5 w-5 group-hover:fill-red-600"
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M5 22h14v0c1.1 0 2-.9 2-2v-9 0c0-.27-.11-.53-.29-.71l-8-8v0c-.4-.39-1.02-.39-1.41 0l-8 8h0c-.2.18-.3.44-.3.71v9 0c0 1.1.89 2 2 2Zm5-2v-5h4v5Zm-5-8.59l7-7 7 7V20h-3v-5 0c0-1.11-.9-2-2-2h-4v0c-1.11 0-2 .89-2 2v5H5Z"></path>
                    </svg>
                    <span>Dashboard</span>
                </Link>

                <Link
                    href="/questions"
                    className={
                        router.pathname == "/questions"
                            ? "flex items-center space-x-2 py-1 dark:text-white pr-20 border-r-4 border-r-red-600 font-semibold"
                            : "flex items-center space-x-2 py-1 dark:text-white hover:border-r-4 hover:border-r-red-600 hover:font-semibold pr-20"
                    }
                >
                    <svg
                        className={
                            router.pathname == "/questions"
                                ? "h-5 w-5 fill-red-600"
                                : "h-5 w-5 group-hover:fill-red-600"
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <g>
                            <path d="M19 2H9c-1.11 0-2 .89-2 2v5.586l-4.707 4.7v0c-.4.39-.4 1.02 0 1.41 .18.18.44.29.7.29v5 0c0 .55.44 1 1 1h16v0c.55 0 1-.45 1-1v-17c0-1.11-.9-2-2-2Zm-8 18H5v-5.586l3-3 3 3V20Zm8 0h-6v-4 0c.55 0 .99-.45 1-1 0-.27-.11-.53-.3-.72L8.99 9.57V3.984h10v16Z"></path>
                            <path d="M11 6h2v2h-2Zm4 0h2v2h-2Zm0 4.03h2v1.96h-2Zm0 3.96h2v2h-2Zm-8 1h2v2H7Z"></path>
                        </g>
                    </svg>
                    <span>Tags</span>
                </Link>

                <Link
                    href="/investigation_summary"
                    className={
                        router.pathname == "/investigation_summary"
                            ? "flex items-center space-x-2 py-1 dark:text-white pr-20 border-r-4 border-r-red-600 font-semibold"
                            : "flex items-center space-x-2 py-1 dark:text-white hover:border-r-4 hover:border-r-red-600 hover:font-semibold pr-20"
                    }
                >
                    <svg
                        className={
                            router.pathname == "/investigation_summary"
                                ? "h-5 w-5 fill-red-600"
                                : "h-5 w-5 group-hover:fill-red-600"
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <g>
                            <path d="M19 2H9c-1.11 0-2 .89-2 2v5.586l-4.707 4.7v0c-.4.39-.4 1.02 0 1.41 .18.18.44.29.7.29v5 0c0 .55.44 1 1 1h16v0c.55 0 1-.45 1-1v-17c0-1.11-.9-2-2-2Zm-8 18H5v-5.586l3-3 3 3V20Zm8 0h-6v-4 0c.55 0 .99-.45 1-1 0-.27-.11-.53-.3-.72L8.99 9.57V3.984h10v16Z"></path>
                            <path d="M11 6h2v2h-2Zm4 0h2v2h-2Zm0 4.03h2v1.96h-2Zm0 3.96h2v2h-2Zm-8 1h2v2H7Z"></path>
                        </g>
                    </svg>
                    <span>Investigation Summary</span>
                </Link>
                <Link
                    href="/page_url_list"
                    className={
                        router.pathname == "/page_url_list"
                            ? "flex items-center space-x-2 py-1 dark:text-white pr-20 border-r-4 border-r-red-600 font-semibold"
                            : "flex items-center space-x-2 py-1 dark:text-white hover:border-r-4 hover:border-r-red-600 hover:font-semibold pr-20"
                    }
                >
                    <svg
                        className={
                            router.pathname == "/page_url_list"
                                ? "h-5 w-5 fill-red-600"
                                : "h-5 w-5 group-hover:fill-red-600"
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <g>
                            <path d="M19 2H9c-1.11 0-2 .89-2 2v5.586l-4.707 4.7v0c-.4.39-.4 1.02 0 1.41 .18.18.44.29.7.29v5 0c0 .55.44 1 1 1h16v0c.55 0 1-.45 1-1v-17c0-1.11-.9-2-2-2Zm-8 18H5v-5.586l3-3 3 3V20Zm8 0h-6v-4 0c.55 0 .99-.45 1-1 0-.27-.11-.53-.3-.72L8.99 9.57V3.984h10v16Z"></path>
                            <path d="M11 6h2v2h-2Zm4 0h2v2h-2Zm0 4.03h2v1.96h-2Zm0 3.96h2v2h-2Zm-8 1h2v2H7Z"></path>
                        </g>
                    </svg>
                    <span>Page Url List</span>
                </Link>
                <div className="mt-8 text-gray-400/70  font-medium uppercase">
                    General
                </div>

                <a
                    onClick={logoutHandler}
                    className=" flex items-center space-x-2 py-1  group hover:border-r-4 hover:border-r-red-600 hover:font-semibold dark:hover:text-white"
                    href="#"
                >
                    <svg
                        className="h-5 w-5 group-hover:fill-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <g>
                            <path d="M16 13v-2H7V8l-5 4 5 4v-3Z"></path>
                            <path d="M20 3h-9c-1.11 0-2 .89-2 2v4h2V5h9v14h-9v-4H9v4c0 1.1.89 2 2 2h9c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2Z"></path>
                        </g>
                    </svg>
                    <span>Logout</span>
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;
