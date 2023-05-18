import { useState, useEffect } from "react";



import { addQuestion } from "@/store/questionSlice";

import { ArrowPathIcon } from "@heroicons/react/20/solid";
import dynamic from "next/dynamic";
const RichTextEditor = dynamic(() => import("@mantine/rte"), { ssr: false });
import { useSelector, useDispatch } from "react-redux";

export default function AddQuestion() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const [content, setContent] = useState();
  const [full_content, setFullContent] = useState();
  const [formData, setFormData] = useState({
    name: "",
    description: "",


  });

  const { name,descriptin  } = formData;
  
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
        addQuestion({ name, descriptin })
      );
      setIsSubmitting(false);
    }
  };


  return (
    <>
      <section className="">
        <div className="w-full p-4 mx-auto ">
          <h1 className="mb-4 text-xl font-light text-left text-gray-900">
            Add new Questions
          </h1>

          
          <form onSubmit={handleSubmit} className="pb-1 space-y-4">
            <div className="flex gap-4">
           
            <label className="block w-1/2">
              <span className="block mb-1 text-sm font-medium text-gray-600">
                Name
              </span>
              <input
                type="text"
                id="name"
                name="name"
                onChange={onChange}
                value={name}
                className="w-full px-3 py-3 rounded-lg bg-gray-50 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-800  border-2"
                placeholder="your question ID?"
                required
              />
            </label>
            <label className="w-full ">
              <span className="w-full block mb-1 text-sm font-medium text-gray-600">
                Description
              </span>
              <input
                type="text"
                id="description"
                name="description"
                onChange={onChange}
                value={description}
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
             
            </label>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={ !content}
                className="bg-red-600 text-white font-bold text-md rounded p-2 disabled:bg-red-400 "
              >
                {isSubmitting ? (
                  <ArrowPathIcon className="w-6 h-6" />
                ) : (
                  " Submit"
                )}
              </button>
            </div>
          </form>
          <div className="my-6 space-y-2"></div>
        </div>
      </section>
    </>
  );
}
