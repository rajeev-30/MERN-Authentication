import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import useGetProfile from '../hooks/useGetProfile.js';

function Profile() {
    const {user,profile} = useSelector(store=>store.user);
    const {id} = useParams()
    useGetProfile(id)

    return (
    <div className='w-[40%] mx-auto bg-white px-20 rounded-lg text-black my-40 py-8'>
        <div className='flex justify-between'>
            <h1 className='text-2xl font-bold'>{profile?.name}</h1>
            {
                profile?._id===user?._id && (<>
                    <Link to={"/updatepassword"} className='bg-[#db255b] text-white p-2 rounded-lg'>Update Password</Link>
                </>)
            }
            {
                profile?._id!=user?._id && (<>
                    <button className='bg-[#db255b] text-white p-2 rounded-lg'>View Profile</button>
                </>)
            }
        </div>
        <div className='mt-8 flex justify-between'>
            <div className='flex flex-col gap-4'>
                <div>user id:</div>
                <div>userename:</div>
                <div>Email:</div>
            </div>
            <div className='flex flex-col gap-4'>
                <div>{profile?._id}</div>
                <div>{profile?.username}</div>
                <div>{profile?.email}</div>
            </div>

        </div>
    </div>
  )
}

export default Profile