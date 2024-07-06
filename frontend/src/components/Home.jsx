import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
  const {user} = useSelector(store=>store.user)
  return (
    <div>
      {
      // (user?.username)
      (user?.name) // git pe push
      }
      
    </div>
  )
}

export default Home