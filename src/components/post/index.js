import React, { useState, useEffect, useCallback, useMemo } from "react";
import '../../styles/post.css'
import Paginations from "./paginations";
import PostList from "./posts";

const Posts = ()=>{
    const [posts, setPosts] = useState([])

    const [page, setPage] =useState(1);
    const POST_PER_PAGE = 5;
    const pageNum =useMemo(()=>Math.ceil(posts.length / POST_PER_PAGE), [posts]) 
    const firstIndex = useMemo(()=>(page -1) * POST_PER_PAGE, [page]) ;
    const lastIndex = useMemo(()=> firstIndex + POST_PER_PAGE, [page]) ;
    const currentPosts = useMemo(()=>posts.slice(firstIndex, lastIndex),[page, posts])


    const handlePrev =useCallback(()=>{
        setPage(prev => Math.max(1, prev-1))
    }, [page])

    const handleNext = useCallback(()=>{
        setPage(prev => Math.min(pageNum, prev+1))
    }, [pageNum])

    useEffect(()=>{

        const handleFetch = async() =>{
            try{
                const res = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await res.json()
                console.log(data)
                setPosts(data)
                




            }catch(err){
                console.log('error: ', err)
            }
         
        }

        handleFetch()


    }, [])




    return (
        <>
           <div className='container'>
            <PostList posts={currentPosts}/>

            <Paginations 
                handleNext={handleNext}
                handlePrev={handlePrev}
                page={page}
                pageNum={pageNum}
                setPage={setPage}
            />
           </div>
        </>
    )
}


export default Posts