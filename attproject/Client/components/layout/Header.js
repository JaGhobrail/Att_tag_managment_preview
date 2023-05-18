import { Bars3Icon } from '@heroicons/react/24/solid';

import { toast }  from 'react-toastify';
import React, { useEffect,useContext } from 'react';

import Notifications from './header/Notifications';
import SearchBox from './header/SearchBox';
import axios from 'axios';
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/auth/actions";

const Header = ({mobileNavsidebar, setMobileNavsidebar}) => {

  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const logoutHandler = () => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(logout());
    if(!isAuthenticated){
      router.push('login')
    }
  };



  return (
    <header className="flex items-center px-6 sm:px-10 bg-white ">
        
        <Bars3Icon className='h-12 stroke-slate-600 cursor-pointer sm:hidden' onClick={()=>setMobileNavsidebar(!mobileNavsidebar)}/>
        <SearchBox />
        
        <div className="flex flex-shrink-0 items-center ml-auto">
          <div className="border-l pl-3 ml-3 space-x-1">
            <Notifications />

            <button onClick={logoutHandler} className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
              <span className="sr-only">Log out</span>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </header>
  );
};

export default Header;