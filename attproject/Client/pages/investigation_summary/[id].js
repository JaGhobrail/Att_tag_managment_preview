import React from "react";
import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestionById } from '@/store/questionSlice';
import Layout from "@/components/layout/Layout";
import { useRouter } from "next/router";


import { updateQuestion } from "@/store/questionSlice";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import dynamic from "next/dynamic";
const RichTextEditor = dynamic(() => import("@mantine/rte"), { ssr: false });




const Details = () => {
  const dispatch = useDispatch();
  const question = useSelector((state) => state.question.selectedQuestion);
  
  const [content, setContent] = useState(question?.content);
  const [full_content, setFullContent] = useState(question?.full_content);
  
  const [edit, setEdit] = useState(false);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = router.query;

    const [formData, setFormData] = useState({
        title: question?.title||"",
        categoryId: question?.categoryId||"",
        qaId: question?.qaId||"",
        importancy: question?.importancy||"",
        askNumber: question?.askNumber||"",
    });
    useEffect(() => {
      if (question) {
        setFormData({
          title: question?.title,
        categoryId: question?.categoryId,
        qaId: question?.qaId,
        importancy: question?.importancy,
        askNumber: question?.askNumber,
        });
        setFullContent(question?.full_content);
        setContent(question?.content);
      }
    }, [question]);
  const { title, categoryId, qaId, importancy, askNumber } = formData;
  useEffect(() => {
    dispatch(fetchQuestionById(id));
  }, [dispatch, id]);


  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (dispatch && dispatch !== null && dispatch !== undefined) {
          setIsSubmitting(true);
          dispatch(
            updateQuestion({ id,title, content, categoryId, qaId, askNumber, importancy,full_content })
          );
          setIsSubmitting(false);
        }
      };
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
 
  if (typeof window !== "undefined"  && !isAuthenticated) {
    router.push("/login");
  }
	return (
		<>
        <Layout title='index'>
      <main className="p-6 sm:p-10 space-y-6">
        
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6">
            <h3 className="text-3xl font-semibold mb-2">{question?.title}</h3>
            <h2 className="text-gray-600 ml-0.5"></h2>
          </div>
          <div className="flex flex-wrap items-start justify-end -mb-3">
            <button onClick={()=>{setEdit(!edit)}} className="inline-flex px-5 py-3 text-white bg-red-500 hover:bg-red-600 focus:bg-red-600 rounded-md ml-6 mb-3">
              
              {!edit  ? <span> Edit</span>  : <span> Back</span> }
            </button>
          </div>
        </div>
        
        {!edit  ? <>
            <section className=" gap-6">
                <div className=" mx-auto overflow-hidden bg-white rounded-lg shadow-lg ">
                
                
                <div className="flex items-center px-6 py-3 bg-red-500">
                    <h1 className="mx-3 text-lg font-semibold text-white">Short Answer :</h1> 
                    
                </div>

                <div className="px-6 py-4">
            
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white"> </h1>
                    <p className="py-2 text-gray-700 mt-2" dangerouslySetInnerHTML={{ __html: question?.content }}></p>
                    
                    {/* <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 11H10V13H14V11Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z"/>
                        </svg>

                        <h1 className="px-2 text-sm">Importancy : {question?.importancy}</h1>
                    </div>

                    <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"/>
                        </svg>

                        <h1 className="px-2 text-sm">how many time Asked: {question?.askNumber}</h1>
                    </div> */}


                </div>
            </div>
                
                
                </section>
                <section className=" gap-6">
                <div className=" mx-auto overflow-hidden bg-white rounded-lg shadow-lg ">
                
                
                <div className="flex items-center px-6 py-3 bg-red-500">
                    <h1 className="mx-3 text-lg font-semibold text-white">Full Answer :</h1> 
                    
                </div>

                <div className="px-6 py-4">
            
        
                    
                    

                    <h1 className="text-xl mt-4 font-semibold text-gray-800 dark:text-white"> </h1>
                    <p className="py-2 text-gray-700 mt-2 " dangerouslySetInnerHTML={{ __html: question?.full_content }}></p>
                </div>
            </div>
                
                
            </section>
    </> :
    <>
     <form onSubmit={handleSubmit} className="pb-1 space-y-4">
            <div className="flex gap-4">
            <label className="block w-1/2">
              <span className="block mb-1 text-sm font-medium text-gray-600">
                Category can&apos;t Change:
              </span>
              <select
                onChange={onChange}
                name="categoryId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                 <option
                    value={question?.categoryId}
                    label={question?.category_name}
                  >
                    {question?.category_name}{" "}
                    
                  </option>
              </select>
            </label>
            <label className="block w-1/2">
              <span className="block mb-1 text-sm font-medium text-gray-600">
                ID
              </span>
              <input
                type="qaId"
                id="qaId"
                name="qaId"
                onChange={onChange}
                value={qaId}
                className="w-full px-3 py-3 rounded-lg bg-gray-50 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-800  border-2"
                placeholder="your question ID?"
                required
              />
            </label>
            <label className="w-full ">
              <span className="w-full block mb-1 text-sm font-medium text-gray-600">
                Question
              </span>
              <input
                type="title"
                id="title"
                name="title"
                onChange={onChange}
                value={title}
                className="w-full px-3 py-3 rounded-lg bg-gray-50 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-800  border-2"
                placeholder="your question ?"
                required
              />
            </label>
            </div>

            <label className="block">
              <span className="block mb-1 text-sm font-medium text-gray-600">
                Answer:{" "}
              </span>
              <RichTextEditor value={content} onChange={setContent} id="rte1" />
             
            </label>
            <label className="block">
              <span className="block mb-1 text-sm font-medium text-gray-600">
                Full Answer:{" "}
              </span>
              <RichTextEditor value={full_content} onChange={setFullContent} id="rte2" />
              {/* <input 
                            value={content} 
                            name="content"
                            placeholder="your answer !" 

                            onChange={onChange}
                            className="w-full px-3 py-3 rounded-lg bg-gray-50 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-800 border-2" 
                            type="text" 
                            required />    */}
            </label>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={!title || !content || !categoryId}
                className="bg-red-600 text-white font-bold text-md rounded p-2 disabled:bg-red-400 "
              >
                {isSubmitting ? (
                  <ArrowPathIcon className="w-6 h-6" />
                ) : (
                  " Update"
                )}
              </button>
            </div>
          </form>
    </>}
        
      </main>
      </Layout>
        
			

		</>
	);
};



export default Details;
