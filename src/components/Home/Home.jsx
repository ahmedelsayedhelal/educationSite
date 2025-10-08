import React from "react";
import { motion } from "framer-motion";
import Stats from "../Home/State";
import Category from "../Home/Category";
import Courses from "../Home/Course";
import Instructor from "../Home/Instructor";
import Review from "../Home/Review";
import LandingPage from "./landing";
import { Link } from "react-router-dom";

const SectionWrapper = ({ children, direction = "up" }) => {
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 80 : -80,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      transition={{ 
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      viewport={{ once: false, amount: 0.2 }} 
      className="my-10"
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  return (
    <>
    <div className="overflow-hidden">
      <section className="bg-gradient-to-br from-blue-0 via-white to-indigo-50 py-24 min-h-screen relative overflow-hidden">
        {/* Enhanced background animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-100/40 via-purple-100/30 to-indigo-100/40"
          animate={{ 
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "300% 300%" }}
        />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60"
              animate={{
                x: [0, Math.random() * 100, 0],
                y: [0, Math.random() * 100, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto flex flex-col lg:flex-row items-center px-6 md:px-12 relative z-10">
          <motion.div
            className="flex-1 text-center lg:text-left mb-12 lg:mb-0"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                🚀 Welcome to the Future of Learning
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              Unlock Your{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 inline-block"
                animate={{ 
                  scale: [1, 1.05, 1],
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ 
                  scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                  backgroundPosition: { repeat: Infinity, duration: 4, ease: "linear" }
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Potential
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Discover your path to success with personalized learning
              experiences designed to help you grow and achieve your goals.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Learning Today
              </motion.button>
              <Link to ="/courses">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 text-lg font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300"
              >
                Explore Courses
              </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex-1 flex justify-center relative"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20"
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            <motion.div
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20"
              animate={{ 
                rotate: -360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            <motion.div
              className="relative"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 2, 0, -2, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=500&fit=crop&crop=face"
                alt="Learning Illustration"
                className="relative w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-3xl shadow-2xl border-4 border-white"
                whileHover={{ 
                  scale: 1.05,
                  rotate: 2
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionWrapper><Stats /></SectionWrapper>
      <SectionWrapper direction="down"><Category /></SectionWrapper>
      <SectionWrapper><Courses /></SectionWrapper>
      <SectionWrapper direction="down"><Instructor /></SectionWrapper>
      <SectionWrapper><Review /></SectionWrapper>
      <SectionWrapper><LandingPage/></SectionWrapper>
    </div>
    </>
  );
};

export default Home;