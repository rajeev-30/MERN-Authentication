import axios from 'axios';
import React, { useState } from 'react'
import { USER_API_END_POINT } from '../utils/Constant';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function UpdatePassword() {
    const {user} = useSelector(store=>store.user)
    const [newPassword, setNewPassword] = useState("")
    const navigate = useNavigate();

    const updatePassHandler = async() =>{
        try {
            const res = await axios.put(`${USER_API_END_POINT}/updatepassword`,{newPassword},
            {withCredentials: true})
            toast.success(res.data.message)
            navigate(`/profile/${user?._id}`)
        } catch (error) {
            console.log("Update password failed: ", error);
            toast.error(error.response.data.message)
        }
    }
  return (
    <div className='w-[40%] mx-auto bg-white px-10 rounded-lg text-black my-40 py-8'>
        <div className='flex justify-between gap-4'>
            <input 
                className='w-full outline-none border-2 rounded-lg px-4'
                type='text' 
                placeholder='Enter new password' 
                value={newPassword}
                onChange={(e)=>setNewPassword(e.target.value)}
                />
            <button className='bg-[#db255b] text-white p-3 px-6 rounded-lg w-fit' onClick={updatePassHandler}>update</button>
        </div>
    </div>
  )
}

export default UpdatePassword