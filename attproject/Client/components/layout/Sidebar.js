import OutsideClick from "../../utils/outsideClick";

import React, { useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { logout } from "@/store/auth/actions";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { sidebarItems } from '@/utils/sidebarItems'

const Sidebar = ({ mobileNavsidebar }) => {
    const dispatch = useDispatch();
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
        <aside className="w-1/6 h-screen overflow-y-scroll min-w-min lg:fixed border-r  border-gray-100  hidden md:block ">
            <div className="flex pl-8 pt-6 pb-4">
                <Image width={28} height={28} src={'/assets/svg/logo.svg'} />
                <h1 className="text-3xl px-2">AT&T</h1>
            </div>
            <div className="w-full border-t  border-gray-100" />

            <div className="mt-12 flex flex-col gap-y-4 text-gray-100 fill-gray-500 text-sm">
                <div className="text-gray-400/70  font-medium pl-5">Menu</div>
                {
                    sidebarItems.map(item => {
                        return (
                            <Link
                                href={item.link}
                                className={
                                    router.pathname == item.link
                                        ? "flex items-center space-x-2 mx-2 px-3 py-3 rounded-lg text-white bg-accent   "
                                        : "flex items-center space-x-2 mx-2 px-3 py-3 rounded-lg  text-gray-400 hover:text-accent"
                                }
                            >
                                <img width={24} height={24} src={item.icon} className="filters brightness-50" color="#0057b8" style={{ fill: '#0057b8' }} />
                                <span>{item.title}</span>

                            </Link>
                        )
                    })
                }

                <div className="mt-8 text-gray-400/70  font-medium pl-5">
                    General
                </div>

                <a
                    onClick={logoutHandler}
                    className=" flex items-center space-x-2 mx-2 px-3 py-3 rounded-lg text-gray-400 hover:text-accent"
                    href="#">
                    <svg
                        className="h-6 w-6 group-hover:fill-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
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
