import { useState, useEffect } from 'react';
import '../../styles/bookLibrary.css'

const BookLibrary =() =>{

    const [book, setBook] = useState({
        title:'',
        author: '',
        publicationYear:""
    })
    const [books, setBooks] = useState([])
    const [selectedFilter, setSelectedFilter] = useState('')
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const filterByOption = ['author', 'Publication Year']

    const handleBookInout =(e) =>{
        const { name, value} = e.target;
        setBook(prev=> ({...prev, [name]: value}))
    }

    const handleBookUpdate =() =>{
        const {id, title, author, publicationYear}  = book;
        if(!title || !author || !publicationYear) return;

        if(id){
            //update
            setBooks(prev=> prev.map(eachBook => eachBook.id===id? book: eachBook))
        }else{
            //create
            setBooks(prev=> [...prev, {...book, id: books.length? books[books.length-1].id+1: 1 }])
        }

        setBook({
            title:'',
            author: '',
            publicationYear:""
        })
    }

    const handleBookRemove =(id ) =>{
        setBooks(prev=> prev.filter(book=> book.id !==id))
    }

    const handleOptionChoose =(option) =>{
        setSearch('')
        setSelectedFilter(option)
    }

    const handleSearchChange = (e) =>{
        setSearch(e.target.value)
    }

    const filteredBooks = books.filter(book=>{
         if(!selectedFilter ||  (selectedFilter && !search)) return books;
         if(selectedFilter==='author') return search.toLowerCase().includes(book.author.toLowerCase())  
            ||   book.author.toLowerCase().includes(search.toLowerCase()) 
        else return  book.publicationYear === search 
    })

    useEffect(()=>{

        setLoading(true)

        // loading data...
        setTimeout(()=>{
            setLoading(false)
        }, [2000])
    

    }, [])

    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(books));
      }, [books]);
    
    useEffect(() => {
        const savedBooks = JSON.parse(localStorage.getItem('books'));
        if (savedBooks) setBooks(savedBooks);
      }, []);


    return (
        <> 
           <div className='container'>
               <h3>Library books</h3>
               <div className='input-container'>
                   <div className='input-field'>
                       <label htmlFor='title'>title</label>
                       <input
                           id='title'
                           name='title' 
                           value={book.title}
                           onChange={handleBookInout}
                           placeholder='title'
                        />

                   </div>


                   <div className='input-field'>
                       <label htmlFor='author'>author</label>
                       <input
                           id='author'
                           name='author' 
                           value={book.author}
                           onChange={handleBookInout}
                           placeholder='Author'
                        />

                   </div>

                   <div className='input-field'>
                       <label htmlFor='publicationYear'>Publication Year</label>
                       <input
                           id='publicationYear'
                           name='publicationYear' 
                           value={book.publicationYear}
                           onChange={handleBookInout}
                           placeholder='publicationYear'
                        />

                   </div>
                   <button className='update' onClick={handleBookUpdate}>{book.id? 'update':'add'} Book</button>

               </div>

               {books.length >0 ?
                <div className='filter-container'>
                   <div>Filter by  </div>

                   <div className='options-container'>
                      {filterByOption.map(option=>(
                        <div 
                            className='option'
                            key={option}
                            onClick={()=> handleOptionChoose(option)}
                            style={{
                                backgroundColor: selectedFilter === option? '#000':'#fff',
                                color: selectedFilter === option? '#fff':'#000',
                            }}
                        >
                                {option}
                        
                        </div>))}
                    </div>
                    <input 
                        value={search} 
                        onChange={handleSearchChange}
                        placeholder={`Filter by ${selectedFilter? selectedFilter==='author'? `author`: `publication year`:''}`}
                    />
                </div>: null
                }

               <div className='books'>
                  {  !loading?
                    filteredBooks.map(book=>(
                    <div key={book.id} className='book'>
                         <div>{book.title}</div>
                         <div>{book.author}</div>
                         <div>{book.publicationYear}</div>
                         <button className='update-button' onClick={()=> setBook(book)}>Edit</button>
                         <button className='delete-button' onClick={()=> handleBookRemove(book.id)}>Remove</button>
                    </div>
                    
                   ))
                   :<div>Loading books</div>
                  }
               </div>

           </div>
           
        </>
    )
}



export default BookLibrary