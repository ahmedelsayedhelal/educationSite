import React from 'react'
import Stats from '../Home/State'
import Category from '../Home/Category'
import Courses from '../Home/Course'
import Instructor from '../Home/Instructor'
import Review from '../Home/Review'
import Footer from '../Home/Footer'

const Home = () => {
  return (
    <div>
          <section className="bg-white py-16 min-h-200 mb-0"  >
          <div className="container mx-auto flex flex-col md:flex-row items-center px-6 md:px-12">
        
        {/* Left Side (Text) */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Unlock Your Potential <br /> with <span className="text-blue-600">Byway</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Welcome to Byway, where learning knows no bounds. We believe that
            education is the key to personal and professional growth, and we’re
            here to guide you on your journey to success.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700">
            Start your journey
          </button>
        </div>

        {/* Right Side (Images) */}
        <div className="flex-1 mt-10 md:mt-0 flex justify-center relative">
          {/* Circle background */}
          <div className="w-72 h-72 bg-blue-100 rounded-full absolute"></div>

          {/* Person Images */}
          <div className="relative flex flex-wrap gap-4 justify-center">
            <img
              src="/person1.png"
              alt="Student 1"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
            />
            <img
              src="/person2.png"
              alt="Student 2"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
            />
            <img
              src="/person3.png"
              alt="Student 3"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
          <Stats />
          <Category />
          <Courses />
          <Instructor />
          <Review/>
    </div>
  )
}

export default Home
