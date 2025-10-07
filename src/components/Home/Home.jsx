import React from 'react'
import Stats from '../Home/State'
import Category from '../Home/Category'
import Courses from '../Home/Course'
import Instructor from '../Home/Instructor'
import Review from '../Home/Review'

const Home = () => {
  return (
    <div>
      <section className="bg-gradient-to-br from-blue-50 to-white py-20 min-h-96">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-6 md:px-12">
          
          {/* Left Side (Text) */}
          <div className="flex-1 text-center md:text-left mb-12 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Unlock Your <span className="text-blue-600">Potential</span> 
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover your path to success with personalized learning experiences 
              designed to help you grow and achieve your goals.
            </p>
            <button className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
              Start Learning Today
            </button>
          </div>

          {/* Right Side (Image) */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              {/* Main Image */}
              <img 
                src='../../../src/images/istockphoto-1059510610-612x612.jpg' 
                alt="Student Learning"
                className="w-80 h-80 md:w-96 md:h-96 object-cover rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-105"
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-yellow-400 rounded-full animate-bounce shadow-lg"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-400 rounded-full animate-bounce shadow-lg" style={{animationDelay: '1s'}}></div>
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