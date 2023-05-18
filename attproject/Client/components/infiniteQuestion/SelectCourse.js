import React, {useState, useRef, useCallback, useEffect} from 'react';
import ReactDOM from 'react-dom';
import useCouseSearch from './useCouseSearch'
import Link from 'next/link';
// import { Spinner } from 'reactstrap'
import { ArrowPathIcon } from '@heroicons/react/20/solid'
import QuestionCard from '../qa/QuestionCard';
function SelectCourse() {
    const [query, setQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [openList, setOpenList] = useState(true);
    const [activeId, setActiveId] = useState(0);

    const {articles, hasMore, loading, error} = useCouseSearch(query, pageNumber);
    const wrapper = useRef();

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if(openList && wrapper.current && !wrapper.current.contains(e.target)){
               setOpenList(true);
            }
        };
        document.addEventListener("click",checkIfClickedOutside);
        return () => {
            document.removeEventListener("click",checkIfClickedOutside);
        };
    }, [openList])
    const observer = useRef();
    const lastArticle = useCallback((node) => {
        if (loading) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPage => prevPage +1)
            }
        });
        if(node) observer.current.observe(node);
        // console.log(node)
    },[loading, hasMore]);

    const articleList = articles && articles.map( (article , index) => {
        if(articles.length === index+1){
            return (
                 <div key={article.id} ref={lastArticle}  className={activeId === article?.id ? "  " : " "}  onClick={(e) => handleSelect(e, article.id)}>
                    <QuestionCard question={article} />
                </div> 
               
            );
        } else {
            return (
                // onClick={(e) => handleSelect(e, article.id)}
                <div className={activeId === article?.id ? "active " : ""}  key={article.id} >
                    <QuestionCard question={article} />
                </div> 
            
            );
        }
    });

    const handleSearch = (e) =>{
        setQuery(e.target.value)
        setPageNumber(1)
    }

    const handleSelect = (e, id) => {
        e.preventDefault();
        setActiveId(id);
        setQuery(e.target.textContent)
        // console.log(e.target.textContent)
    }
    return (
        <div className="courses-area courses-section pt-100 pb-70" ref={wrapper}>
                <div className="container" >
                <div className="edemy-grid-sorting row align-items-center">
                        <div className="col-lg-8 col-md-6 result-count">
                           
                        </div>

                       
                    </div>
                            
                            {openList && <div className="row" >
                            {articleList}

                            </div>
                            }
                            
                            <div>{openList && loading && (
                                
                                <div  className='text-center mt-2 text-red-600'> 
                                <section className="">
                                    <div className="w-full col-span-12 p-4 mx-auto mt-6 lg:col-span-12 xl:p-12 md:w-1/6">
                                    <div className="w-12 h-12 rounded-full animate-spin absolute
                                border-8 border-solid border-red-500 border-t-transparent shadow-md"></div>
                                    
                                    </div>
                                </section>
                                </div>
                            )}</div>
                            <div>{openList && error && error}</div>
                        
            </div>
        </div>
    );
}

export default SelectCourse;

// if (document.getElementById('root')) {
//     ReactDOM.render(<Select2 />, document.getElementById('root'));
// }
