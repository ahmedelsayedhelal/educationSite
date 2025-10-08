import React from 'react'
import { Link } from 'react-router-dom'
import Course from '../components/Home/Course'

const DashboaedHeader = () => {
  return (
    <>
        <header className="w-full bg-white shadow-sm">
       <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl text-gray-800">Byway</span>
        </div>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-lg mx-6">
          <input
            type="text"
            placeholder="Search courses"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-gray-700">
          <Link to="/Courses" className="hover:text-blue-600">Courses</Link>
        </nav>
        </div>
        </header> 
    </>   
  )
}

export default DashboaedHeader
