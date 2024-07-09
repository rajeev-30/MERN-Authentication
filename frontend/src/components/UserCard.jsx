import React from 'react'
import { Link } from 'react-router-dom'

function UserCard({name, id}) {
  return (
    <div className='w-[30%] mx-auto flex gap-4 border-2 border-red justify-between m-4 p-4 rounded-lg'>
        <div>{name}</div>
        <Link to={`/profile/${id}`} className='bg-[#db255b] text-white p-2 rounded-lg'>View Profile</Link>
    </div>
  )
}

export default UserCard