import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

const Portal = () => {
  return (
    <div className='homeContainer'>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Portal