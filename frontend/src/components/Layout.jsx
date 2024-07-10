import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useSelector } from 'react-redux'
import useGetAllUsers from '../hooks/useGetAllUsers.js'

function Layout() {
  const {user, profile} = useSelector(store=>store.user)
  const navigate = useNavigate()

  useEffect(()=>{
    if(!user)
      navigate("/login")
  },[user]);

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