import axios from 'axios'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { USER_API_END_POINT } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

const useGetAllUsers = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(store=>store.user)
    const fetchAllUsers = async() =>{
        try {
            const res = await axios.get(`${USER_API_END_POINT}/allusers`, {
                withCredentials:true
            });
            dispatch(getAllUsers(res.data.users))
            console.log("use get all users");
            // toast.success(res.data.message)
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            // console.log("token all users");
        }
    }
    useEffect(()=>{
        fetchAllUsers()
    },[user])
}

export default useGetAllUsers