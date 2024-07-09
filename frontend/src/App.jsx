import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Body from './components/Body'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className='min-h-screen max-h-full bg-[#0F172A] font-sans text-white'>
      <Body/>
      <Toaster/>
    </div>
  )
}

export default App
