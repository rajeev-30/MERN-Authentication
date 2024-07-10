import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '../utils/Constant';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/userSlice';
import toast from 'react-hot-toast';

function Login() {
    const {user}  = useSelector(state => state.user)
    const [isLogin, setIsLogin] = useState(false)
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const submitHandler = async (e) =>{
        setIsLoading(true);
        e.preventDefault();
        if(isLogin){
            try {
                const res = await axios.post(`${USER_API_END_POINT}/login`,{username, password},{
                    headers:{
                        "Content-Type":"application/json"
                    },
                    withCredentials:true
                })
                dispatch(setUser(res?.data?.user))
                if(res.data.success){
                    navigate("/")
                } 
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                setIsLoading(false);
            }
        }else{
            try {
                const res = await axios.post(`${USER_API_END_POINT}/register`, {name,username,email,password},{
                    headers:{
                        "Content-Type":"application/json",
                    },
                    withCredentials:true
                });
                if(res.data.status){
                    setIsLogin(true)
                }
                toast.success(res.data.message);
            } catch (error) {
               toast.error(error.response.data.message);
            } finally {
                setIsLoading(false);
            }
        }
    }
    const loginHandler = () =>{
        setIsLogin(!isLogin);
        console.log(user);
    }

    // useEffect(()=>{
    //     if(user) navigate("/")
    // },[user])
  return (
    <div className='w-full h-screen pt-28 text-black'>
        <div className='w-[30%] min-h-[60%] max-h-[100%] bg-[#ffffffd8] mx-auto rounded-lg px-12 py-8'>
            <h1 className='text-2xl font-bold'>
                {isLogin?"LOGIN":"REGISTER"}
            </h1>
            <form onSubmit={submitHandler} >
                {
                    !isLogin && (<>
                        <p className='mt-6 text-lg' >Name</p>
                        <input type="username" value={name} onChange={(e)=>setName(e.target.value)} className=' w-full p-2 mt-1 bg-transparent outline-none border-2 border-gray-400 rounded-lg'/> 
                    </>) 
                }
                <p className='text-lg mt-4' >Username</p>
                <input type="username" value={username} onChange={(e)=>setUsername(e.target.value)} className=' w-full p-2 mt-1 bg-transparent outline-none border-2 border-gray-400 rounded-lg'/>
                {
                    !isLogin && (<>
                        <p className='mt-4 text-lg'>Email</p>
                        <input type="username" value={email} onChange={(e)=>setEmail(e.target.value)} className=' w-full p-2 mt-1 bg-transparent outline-none border-2 border-gray-400 rounded-lg'/>
                    </>)
                }
                <p className='mt-4 text-lg'>Password</p>
                <input type="username" value={password} onChange={(e)=>setPassword(e.target.value)} className=' w-full p-2 mt-1 bg-transparent outline-none border-2 border-gray-400 rounded-lg'/>
                <button type="submit" className="w-full mt-10 py-2.5 bg-[#db255b]  rounded-lg">{isLoading?"Loading...":(isLogin?"LOGIN":"REGISTER")}</button>
                <p className='mt-4'>{isLogin?"Don't have an account?":"Already have an account?"} <span onClick={loginHandler} className='cursor-pointer text-blue-500'>{isLogin?"REGISTER":"LOGIN"}</span></p>
            </form>
        </div>
    </div>

  )
}

export default Login