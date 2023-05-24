


import Layout from '@/components/layout/Layout';
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import AddQuestion from '@/components/tracker_list/AddQuestion';
import QuestionList from '@/components/tracker_list/QuestionList';
import { useEffect, useState } from 'react'


export default function InvestigationSummary() {
    const router = useRouter();
    const [add, setAdd] = useState(false);

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    // const user = useSelector((state) => state.auth.user);
    // const loading = useSelector((state) => state.auth.loading);

    if (typeof window !== "undefined" && !isAuthenticated) {
        router.push("/login");
    }
    return (
        <>
            <Layout title='index'>
                <main className="p-6 sm:p-10 space-y-6">

                    <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                        <div className="mr-6">
                            <h1 className="text-4xl font-semibold mb-2">Pgae Url List</h1>
                            <h2 className="text-gray-600 ml-0.5"></h2>
                        </div>
                        <div className="flex flex-wrap items-start justify-end -mb-3">
                            {/* <button className="inline-flex px-5 py-3 text-red-500 hover:text-red-600 focus:text-red-600 hover:bg-red-100 focus:bg-red-100 border border-red-500 rounded-md mb-3">
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Manage Categories
            </button> */}
                            <button onClick={() => { setAdd(!add) }} className="inline-flex px-5 py-3 text-white bg-red-500 hover:bg-red-600 focus:bg-red-600 rounded-md ml-6 mb-3">
                                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                {!add ? <span>Create new Changes to IS</span> : <span>Manage IS</span>}
                            </button>
                        </div>
                    </div>

                    <section className=" gap-6">


                        {!add ? <QuestionList /> : <AddQuestion />}

                    </section>

                </main>
            </Layout>
        </>
    )
}
