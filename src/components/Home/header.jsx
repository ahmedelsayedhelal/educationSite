import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
  return (
    <div>
        <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
        
          <span className="font-bold text-xl text-gray-800">Byway</span>
        </div>

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

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <button className="text-gray-700 hover:text-blue-600">Log In</button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Sign Up
          </button>
        </div>
      </div>
    </header>
    </div>
  )
}

export default Header
