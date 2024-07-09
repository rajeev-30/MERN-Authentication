import React, { useState } from 'react'
import {useSelector } from 'react-redux'
import UserCard from './UserCard';

function Users() {
    const {allUsers} = useSelector(store=>store.user)
    // useGetAllUsers()
  return (
    <div>
        {
            allUsers.map((user)=>{
                return (<div key={user._id} className=''>
                    <UserCard name={user.name} id={user?._id}/>
                </div>)
            })
        }
    </div>
  )
}

export default Users