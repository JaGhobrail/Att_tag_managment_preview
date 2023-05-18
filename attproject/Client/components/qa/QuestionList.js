import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { fetchQuestions,deleteQuestion   } from '../../store/questionSlice';

import QuestionCard from './QuestionCard';


export default function QuestionList() {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      dispatch(deleteQuestion(id));
    }
  };
  const { questions, status } = useSelector(state => state.question);
  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);
  if (status === 'loading') return  <div  className='text-center mt-2 text-red-600'> 
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
      {questions?.data?.data && questions?.data?.data.map((question) => (
        <div key={question.id}>
          <QuestionCard question={question} />
          <button onClick={() => handleDelete(question.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}