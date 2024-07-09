import axios from 'axios';
import React, { useEffect } from 'react'
import { USER_API_END_POINT } from '../utils/Constant';
import { useDispatch } from 'react-redux';
import { getProfile } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const useGetProfile = (id) =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const fetchProfile = async() =>{
        try {
            const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
                withCredentials: true
            })
            dispatch(getProfile(res.data.user));
            console.log("use get profile");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }
    useEffect(()=>{
        fetchProfile()
    },[id])
}

export default useGetProfile