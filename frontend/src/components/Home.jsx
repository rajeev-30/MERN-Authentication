import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from './Navbar'

function Home() {
  const {user} = useSelector(store=>store.user)
  
  return (
    <div className='w-full text-center'>
      <div className='py-[15%]'>
        <div className='text-lg font-bold font-mono text-green-400 mb-4'>Welcome</div>  

        {
          user && (<>
            <div className='text-7xl font-bold my-6'>{user?.name}</div>  
            <div className='text-3xl pt-4'>Happy, To See You Back!</div>
          </>)
        }
        {
          !user && (<>
            <div className='text-2xl pt-4'>We Are The MERN Developers</div>
        </>)
        }
      </div>
    </div>
  )
}

export default Home