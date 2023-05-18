import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { fetchQuestions, deleteQuestion } from '../../store/pageUrlListSlice';

import QuestionCard from './QuestionCard';


export default function QuestionList() {
    const dispatch = useDispatch();
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            dispatch(deleteQuestion(id));
        }
    };
    const { questions, status } = useSelector(state => state.investigation);
    useEffect(() => {
        dispatch(fetchQuestions());
    }, [dispatch]);
    if (status === 'loading') return <div className='text-center mt-2 text-red-600'>
        <section className="">
            <div className="w-full col-span-12 p-4 mx-auto mt-6 lg:col-span-12 xl:p-12 md:w-1/6">
                <div className="w-12 h-12 rounded-full animate-spin absolute
                                    border-8 border-solid border-red-500 border-t-transparent shadow-md"></div>

            </div>
        </section>
    </div>;
    if (status === 'failed') return <div>Failed to load tags</div>;

    return (
        <div >
            {questions?.data?.data && questions?.data?.data?.map((question) => (

                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>



                                <th scope="col" class="px-6 py-3">
                                    invest snap id
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    title
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    invest level
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    invest version
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    scan year
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    scan month
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={question.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <QuestionCard question={question} />


                            </tr>

                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}
