
import { useState, useEffect } from "react";
import Link from 'next/link';
export default function QuestionCard({ question }) {
    const [isopen, setIsOpen] = useState(false);
    const openTab = (e) =>
        setIsOpen(!isopen);
    return (
        <>
            <div className="grid mx-20">

                <div className="bg-white rounded-lg shadow-sm hover:shadow-lg duration-500 px-2 sm:px-6 md:px-2 py-4 my-6">
                    <div className="grid grid-cols-12 gap-3">

                        <div className="col-span-0 sm:col-span-2 text-center hidden sm:block">

                            <div className="grid grid-rows-2">
                                <div className="inline-block font-medium text-xl">
                                    {question?.rate}
                                </div>

                                <div className="inline-block font-medium text-sm">
                                    importancy
                                </div>
                            </div>


                            <a href="#" className="grid  mx-auto mb-3 py-1 w-4/5  rounded-md bg-green-400">
                                <div className="inline-block font-medium text-2xl text-white">
                                    {question?.id}
                                </div>

                                {/* <div className="inline-block font-medium text-white mx-1 text-sm lg:text-md">
                            
                        </div> */}
                            </a>


                            <div className="grid my-3">
                                <span className="inline-block font-bold text-xs">
                                    Rank : {question?.rank}
                                </span>
                            </div>
                        </div>


                        <div className="col-span-12 sm:col-start-3 sm:col-end-13 px-3 sm:px-0">
                            <div className="grid block sm:hidden">
                                <div className="flex flex-wrap">
                                    <div className="mr-2">
                                        <div className="inline-block font-light capitalize">
                                            <i className="uil uil-arrow-circle-up mr-1"></i>
                                            <span className="text-sm">
                                                ID :  {question?.id}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mr-2">
                                        <div className="inline-block font-light capitalize">
                                            <i className="uil uil-check-circle mr-1"></i>
                                            <span className="text-sm">
                                                {question?.importancy} importancy
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mr-2">
                                        <div className="inline-block">
                                            <i className="uil uil-eye mr-1"></i>
                                            <span className="text-sm capitalize font-light">
                                                {question?.importancy} askNumber
                                            </span>
                                        </div>
                                    </div>


                                </div>
                            </div>



                            <article className="border-gray-300 border-b hover:bg-gray-200">
                                <div>
                                    <header onClick={openTab} className="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none bg-gray-200">
                                        <h3 className="font-semibold text-xl text-gray-800">
                                            {question?.name}
                                        </h3>
                                        <div className="rounded-full border w-7 h-7 flex items-center justify-center hover:bg-gray-100">
                                            {isopen ?
                                                <div className="rounded-full text-gray-400 w-7 h-7 flex items-center justify-center">
                                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                </div>
                                                :
                                                <div className="rounded-full text-gray-400 w-7 h-7 flex items-center justify-center">
                                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                                </div>
                                            }
                                        </div>
                                    </header>
                                    {isopen && <div >
                                        <div className="pl-8 pr-8 py-5 bg-gray-50 text-gray-600">
                                            <p className="mt-2 text-gray-700 text-sm md:text-md" dangerouslySetInnerHTML={{ __html: question?.description }}></p>
                                        </div>
                                    </div>}
                                </div>
                            </article>


                            <div className="grid grid-cols-2 mt-4 my-auto">

                                <div className="col-span-12 lg:col-span-8">
                                    
                                    
                                </div>


                                <div className="col-none hidden mr-2 lg:block lg:col-start-9 lg:col-end-12">
                                    <Link href={`/questions/${question.id}`} className="flex items-center">

                                        <div className="text-gray-600 font-bold text-sm hover:underline">
                                            Details
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
