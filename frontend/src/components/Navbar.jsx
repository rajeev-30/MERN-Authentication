import React from 'react'
import { NavLink, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { getAllUsers, getProfile, setUser } from '../redux/userSlice'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/Constant'

function Navbar() {
    const {user} = useSelector(store=>store.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const LogoutHandler = async() =>{
        try {
            const res =  await axios.get(`${USER_API_END_POINT}/logout`,{
                withCredentials: true,
            });
            dispatch(setUser(null))
            dispatch(getProfile(null))
            dispatch(getAllUsers(null))
            navigate("/login")
            toast.success(res.data.message);

        } catch (error) {
            console.log("Logout error: ", error);
            toast.error(error?.response?.data?.message);
        }
    }

  return (
    <div className='w-[100%] px-[20%] mx-auto flex justify-between py-6 border-b-2 text-[#db255b]'>
        <div>MERN Authentication</div>
        <div className='flex gap-6'>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={`/profile/${user?._id}`} >Profile</NavLink>
            <NavLink to={"/users"}>Users</NavLink>
            {
                !user && (<>
                    <NavLink to={"/login"}>Login</NavLink>
                </>)
            }
            {
                user && (<>
                    <button onClick={LogoutHandler}>Logout</button>
                </>)
            }
        </div>
    </div>
  )
}

export default Navbar