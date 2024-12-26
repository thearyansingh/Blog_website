import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Home/Hero'
import { useAuth } from '../Context/AuthProvider'
import Trending from '../Home/Trending'
import Devotional from '../Home/Devotional'
import PopularCreator from '../Home/PopularCreator'
const Home = () => {
  
  return (
    <div>
 <Hero/>  
 <Trending/>
 <Devotional/>
 <PopularCreator/>
    </div>
  )
}

export default Home
