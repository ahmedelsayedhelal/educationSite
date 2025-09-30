import React from 'react'
import Header from '../../components/Home/header'
import Home from '../../components/Home/Home'
import Stats from '../../components/Home/State'
import Category from '../../components/Home/Category'
import Instructor from '../../components/Home/Instructor'
import Footer from '../../components/Home/Footer'
import Review from '../../components/Home/Review'
import Courses from '../../components/Home/Course'
import { Outlet } from 'react-router-dom'


const Mainlayout = () => {
  return (
    <div>
      <Header />
             <Outlet/>
      <Footer />
     
    </div>
  )
}

export default Mainlayout
