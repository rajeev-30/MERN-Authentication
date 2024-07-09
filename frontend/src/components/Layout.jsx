import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useSelector } from 'react-redux'
import useGetAllUsers from '../hooks/useGetAllUsers.js'
import Cookies from "js-cookie"

function Layout() {
  const {user} = useSelector(store=>store.user)
  const navigate = useNavigate()
  const token = Cookies.get('token')

  useEffect(()=>{
    if(!user)
      navigate("/login")
  },[]);

  
    useGetAllUsers()
  
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout