import React from 'react';

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Section - Become an Instructor */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="order-2 lg:order-1">
              <div className="bg-purple-100 rounded-2xl p-8 max-w-md mx-auto">
                <img 
                  src="https://st2.depositphotos.com/2208684/5796/i/450/depositphotos_57968153-stock-photo-teacher-in-front-of-black.jpg" 
                  alt="Female instructor with glasses and curly hair"
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>
            </div>
            
            {/* Text Section */}
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Become an Instructor
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Instructors from around the world teach millions of students on Byway. 
                We provide the tools and skills to teach what you love.
              </p>
              <button className="bg-gray-900 text-white px-8 py-4 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors">
                Start Your Instructor Journey
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section - Transform your life */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Section */}
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Transform your life through education
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Learners around the world are launching new careers, advancing in their fields, 
                and enriching their lives.
              </p>
              <button className="bg-gray-900 text-white px-8 py-4 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors">
                Checkout Courses
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Image Section */}
            <div>
              <div className="bg-blue-100 rounded-2xl p-8 max-w-md mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" 
                  alt="Male student with laptop"
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;