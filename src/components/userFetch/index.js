import { useState, useEffect } from 'react'
import styles from '../../styles/userFetch.module.css'
import UserList from '../users/userList'

const UsersFetch= () =>{

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [search, setSearch] = useState('')

    useEffect(()=>{ 

        const handleUserFetch = async() =>{
            setLoading(true)
            setError(false)
            try{
                const res = await fetch('https://jsonplaceholder.typicode.com/users')
                const data = await res.json();
                console.log('data', data)
                setUsers(data);

            }catch(err){
                setError(true)
            }finally{
                setLoading(false)
            }
          
        }
        handleUserFetch()

    }, [])

    const handleSearch =(e) => {
        setSearch(e.target.value);      
    }

    const filteredUsers = () =>{
        if(!search.trim()) return users;
        return users.filter(user=> 
            user.name.toLowerCase().includes(search.toLowerCase()) || 
            user.username.toLowerCase().includes(search.toLowerCase()))
    }

    return (
        <>
           <div className='container'>
                
                <input placeholder='search for name' className={styles.input} id='search' value={search} onChange={handleSearch}/>
               {loading && <div>Loading User Data ...</div>}
               {error && <div>Error Fetching User Data ...</div>}
               {users.length>0 && <UserList users={filteredUsers()}/>}

           </div>
        </>
    )
}

export default UsersFetch