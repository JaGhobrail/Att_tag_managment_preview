import Head from "next/head";
import React, {  useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { request_refresh } from "@/store/auth/actions"
;
const Layout = ({children, title="Sample Title"}) => {
     //console.log("layout", title)
     const [mobileNavsidebar, setMobileNavsidebar] = useState(false);
     
     const dispatch = useDispatch();

  //    useEffect(() => {
  //      if (dispatch && dispatch !== null && dispatch !== undefined)
  //          dispatch(request_refresh());
  //  }, [dispatch]);

  return (
    <>
      
      <Head>
        <title>{title}</title>
        <meta name="description" content="Interview Helper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

       <div className="font-montserrat text-sm bg-white dark:bg-zinc-900">
          <div className="flex min-h-screen  2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x-2 2xl:border-gray-200 dark:2xl:border-zinc-700">
            
            <Sidebar mobileNavsidebar={mobileNavsidebar} />
            
            <div className="lg:ml-60 flex-1 py-10 px-5 sm:px-10">
              <Header mobileNavsidebar={mobileNavsidebar} setMobileNavsidebar={setMobileNavsidebar} />
                {children}
            </div>

          </div> 
       </div>
        

    </>
  );
};

export default Layout;
