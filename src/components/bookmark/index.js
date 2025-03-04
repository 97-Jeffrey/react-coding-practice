import { useState } from "react"
import '../../styles/bookmark.css'


const BookMark  =() =>{

    const [bookMarks, setBookMarks] = useState([])
    const [bookMark, setBookMark] = useState({
        title:'',
        url:'',
        category: 'general'
    });
    const [selectedCategory, setSelectedCategory] = useState('All')


    const handleAddProp = (item, value) =>{
        setBookMark(prev => ({...prev, [item]: value }))
    }

    const handleBookMarkUpdate = () =>{
       const {id, title, url, category} = bookMark;
       if(!title || !url || !category) return;

       //udpate existing bookmark
       if(id){
          setBookMarks(prev => prev.map(bookmark => bookmark.id ===bookMark.id? bookMark: bookmark))
       }else{
          // add a new bookmark:
            bookMark.id = bookMarks.length? bookMarks[bookMarks.length-1].id +1: 1;
            setBookMarks(prev=> [...prev, bookMark])
       }

       setBookMark({
        title:'',
        url:'',
        category: 'general'
        })
    }

    const  handleBookMarkDelete =(id)=>{
      setBookMarks(prev => [...prev].filter(bookmark=> bookmark.id!==id))
    }


    const handleBookMarkSelect = (id) =>{
        const selected = bookMarks.find(bookmark=> bookmark.id ===id);
        setBookMark(selected)
    }


    return (
        <> 
           <div className='container'>
               <div>Book Mark Manager</div>

               <div>
                   <div>{bookMark.id? 'Edit': 'Create'} a book mark</div>
                   <div>
                       <label htmlFor="title">Title</label>
                       <input id='title' placeholder="title" onChange={(e)=>handleAddProp('title', e.target.value)} value={bookMark.title}/>
                   </div>

                   <div>
                       <label htmlFor="url">URL</label>
                       <input id='url' placeholder="URL"  onChange={(e)=>handleAddProp('url', e.target.value)} value={bookMark.url} />
                   </div>

                   <div>
                    <span>Category</span>
                    <select onChange={(e)=>{
                        handleAddProp('category', e.target.value)

                    }}
                       value={bookMark.category}
                    >
                        <option >Development</option>
                        <option >General</option>
                        <option >Reference</option>
                    </select>
                   </div>

                   <button onClick={handleBookMarkUpdate}>{bookMark.id ?'update':'Add'} Bookmark</button>
               </div>

               <div className="bookmark-container">
                   <select onChange={(e)=>{
                        setSelectedCategory(e.target.value)

                    }}>
                        <option >All </option>
                        <option >Development</option>
                        <option >General</option>
                        <option >Reference</option>
                    </select>
                    <div className='bookmarks'>
                        {bookMarks
                           .filter(item=> selectedCategory ==='All'? item: item.category===selectedCategory)
                           .map(bookmark=> (
                            <div key={bookmark.id} className='bookmark'>
                                <div>Title: <span>{bookmark.title}</span></div>
                                <div 
                                    className='bookmark-url' 
                                    onClick={()=> window.open(bookmark.url)}
                                >
                                    Url: <span> {bookmark.url}</span>
                                </div>
                                <div> Category: <span> {bookmark.category}</span></div>
                                <button onClick={()=>handleBookMarkSelect(bookmark.id)} className="update-button">Edit</button>
                                <button  onClick={()=>handleBookMarkDelete(bookmark.id)} className="delete-button">Delete</button>
        
                        </div>))}
                    </div>

               </div>

               

           </div>
        </>
    )
}

export default BookMark