
import { useState } from 'react';
import '../../styles/task.css'

const Task =() =>{

    const [ task, setTask] = useState({
        title: '',
        description: '',
        dueDate:''
    })
    const [tasks, setTasks] = useState([])
    const buttonOptions= ['All', 'Completed', 'Pending']
    const [filter, setFilter] = useState('')


    const handleTaskChange =(e) =>{
        const {name, value} = e.target;
        setTask(prev=> ({...prev, [name]: value}))

    }

    const handleTaskUpdate  =() =>{

        if (!task.title || !task.description || !task.dueDate) {
            alert('Please fill out all fields');
            return;
          }
         const {id} = task;
        if(id){
            console.log('update')
            setTasks(prev=> prev.map(eachTask=> eachTask.id ===task.id? task: eachTask))
        }else{
            console.log('create')
            const newTask ={...task, completed:false, id: tasks.length? tasks[tasks.length-1].id+1:1};
            setTasks(prev=> [...prev, newTask])
        }

        setTask({
            title: '',
            description: '',
            dueDate:''
        })
    }

    const handleTaskComplete =(id) =>{
        setTasks(prev=> prev.map(task=> task.id===id? {...task, completed: !task.completed }: task))
    }

    const  handleTaskRemove = (id) =>{
         setTasks(prev=> prev.filter(task=> task.id!==id))
    }


    const filteredTask =()=>{
        if(!filter || filter ==='All') return tasks;
        if(filter ==='Completed') return tasks.filter(task=> task.completed);
        else return tasks.filter(task=> !task.completed)
    } 

    console.log(tasks)
    
    return (

        <>
           <div className='container'>

              <div className='input-container'>
                <label htmlFor='title'>Title</label>
                <input 
                    id='title' 
                    value={task.title} 
                    name='title' 
                    placeholder='title'
                    onChange={handleTaskChange}
                />
              </div>

              <div className='input-container'>
                <label htmlFor='description'>Description</label>
                <input 
                    id='description' 
                    value={task.description} 
                    name='description' 
                    placeholder='description'
                    onChange={handleTaskChange}
                />
              </div>

              <div className='input-container'>
                <label htmlFor='date'>Due Date</label>
                <input 
                    id='date' 
                    type='date'
                    value={task.dueDate} 
                    name='dueDate' 
                    placeholder='date'
                    onChange={handleTaskChange}
                />
              </div>

              <button 
                className='update-button'
                onClick={handleTaskUpdate}
              >Add Task</button>

              {  tasks.length?
                <div className='button-container'>
                {
                    buttonOptions.map(button=>(
                        <div 
                            className='button-filter' 
                            key={button}
                            style={{
                                backgroundColor: button === filter?'#000':'#fff',
                                color: button === filter?'#fff':'#000',
                            }}
                            onClick={()=> setFilter(button)}
                        >
                        {button}
                    </div>))
                }

                </div>
              :null
              }


              <div className='tasks'>
                  {filteredTask()
                  .sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate))
                  .map(task=>(
                    <div key={task.id} className='task'>
                        <div>{task.title}</div>
                        <div>{task.description}</div>
                        <div>{task.dueDate}</div>
                        <div>completed: {task.completed? 'true':'false'}</div>
                        <div> <input checked={task.completed} onChange={()=>handleTaskComplete(task.id)} type='checkbox'/></div>
                        <button className='edit-button' onClick={()=>{setTask(task)}}>Edit</button>
                        <button className='delete-button' onClick={()=>{handleTaskRemove(task.id)}}>Delete</button>
                    </div>
                   ))}
              </div>

            

           </div>
        </>
    )
}

export default Task;