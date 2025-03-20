
import '../../styles/post.css'

const Paginations = ({  
    handleNext,
    handlePrev,
    page,
    pageNum,
    setPage
}) =>{
    return (
        <>
           <div className='post-pagniations'>
                <button 
                    className="post-pagniations-button pangination-text"
                    onClick={handlePrev}
                    disabled={page===1}
                >
                    Prev
                </button>
                    {new Array(pageNum).fill(0).map((item, index)=>(
                        <button 
                            className={`post-pagniations-button  ${index+1===page? "current-page":""}`}
                            key={index}
                            onClick={()=> {
                                if(page ===index+1) return;
                                setPage(index+1)
                            }}
                        >
                            {index +1}
                        </button>
                    ))
                    }
                <button 
                    className="post-pagniations-button pangination-text"
                    onClick={handleNext}
                    disabled={page===pageNum}
                >
                    Next
                </button>
            </div>
        
        </>
    )
}


export default Paginations;