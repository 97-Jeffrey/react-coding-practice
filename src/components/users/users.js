import React, { useState, useEffect } from "react";
import UserList from "./userList";

const Users = ()=>{
    const [users, setUsers] = useState([])

    useEffect(()=>{

        const handleFetch = async() =>{
            try{
                const res = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await res.json()
                console.log(data)
                setUsers(data)

            }catch(err){
                console.log('error: ', err)
            }
         
        }

        handleFetch()


    }, [])

    return (
        <>
           <UserList users={users}/>
        </>
    )
}


export default Users