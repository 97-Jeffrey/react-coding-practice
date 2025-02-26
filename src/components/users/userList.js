import React from "react";
import '../../styles/users.css'

const UserList = ({ users }) =>{
    return (
        <>
            <div className="users-container">
               {users.map(user=>(
                    <div key={user.id} className="user">
                        <div className="user-name">{user.name} / {user.username}</div>
                        <div className="user-email">{user.email}</div>
                    </div>
               ))
               }
           </div>
        </>
    )
}

export default UserList