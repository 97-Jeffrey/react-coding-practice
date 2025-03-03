import { useState } from "react"
import '../../styles/todo.css'

const Todo = () =>{

    const [input, setInput] = useState('');
    const [todos, setTodos] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('All')

    const handleTodoText =(e)=>{
        setInput(e.target.value)
    }

    const handleCompleteTodo =(id)=>{
        setTodos(prev=> prev.map(todo => id=== todo.id? {...todo, completed: !todo.completed}: todo))
    }

    const handleAddTodo = () =>{
        const todo ={
            id: todos.length? todos[todos.length-1].id+1 :0,
            name: input,
            completed: false
        }
        if(input){
            setTodos(prev=> [...prev, todo])
            setInput('')

        }

        

    }


    const handleFilterButtonSelect =(text) =>{

        setSelectedFilter(text);

        if(text === 'Clear Active'){
            setTodos(prev=> prev.filter(todo => !todo.completed))
        }
        


        




    }

    return (
        <>   

           <div>
               <div>Todo List</div>

               <div className="input-section">
                   <input 
                       type='text' 
                       onChange={handleTodoText}  
                       value={input}
                       placeholder="Add a new todo"
                    />
                   <button className="add-button" onClick={handleAddTodo} >Add</button>
               </div>

               <div className='filter-button-container'>
                 {
                    ['All', 'Completed', 'Active', 'Clear Active'].map(item=>(
                        <div 
                            key={item}
                            onClick={()=>handleFilterButtonSelect(item)}
                        >
                            <button 
                                className={`filter-button ${selectedFilter===item? `filter-button-selected`:''}`}
                            >{item}</button>
                        </div>
                    ))
                 }
               </div>

               <div className='todos'>
                {todos
                .filter(eachTodo=> selectedFilter==='All'? eachTodo:
                    selectedFilter === 'Completed'? eachTodo.completed:
                    selectedFilter === 'Active'?  !eachTodo.completed: eachTodo
                )
                .map(todo=> (
                    <div className={`todo ${todo.completed? `todo-complete`:''}` } key={todo.id}>
                        <div>
                            {todo.name}
                        </div>
                        <input type='checkbox' onChange={()=>handleCompleteTodo(todo.id)} checked={todo.completed}/>
                    </div>
                ))}

               </div>


           </div>
        </>
    )
}

export default Todo