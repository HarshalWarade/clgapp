import React from 'react'
import { useAuth } from '../store/auth'


const Relax = () => {

    const {isLoggedIn} = useAuth()


  return (
    <div>
      {
        isLoggedIn ? (
            <h1>Logged In</h1>
        ) : (
            <h1>Not Logged in</h1>
        )
      }
    </div>
  )
}

export default Relax
