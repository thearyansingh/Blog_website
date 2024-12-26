import React from 'react'
import { useAuth } from '../Context/AuthProvider'
import { Link } from 'react-router-dom';

const Hero = () => {
const {Blogs}=useAuth();
const blogsArray = Blogs.Blogs;




  return (
    <div className='container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-10'>
{blogsArray.length>0?(
blogsArray.slice(0,4).map((element)=>{



   return <Link to={`detail/${element._id}`} key={element._id} className='bg-white shadow-md rounded-lg hover:shadow-lg overflow-hidden tranform hover:scale-105 transition-transform  duration-300 '>
<div className='group relative '> 
  <img src={element.BlogImage.url} className='w-full h-56 object-cover' alt="" />
  
  <h1 className='text-white text-xl font-semibold absolute bottom-4 left-5 tranform group-hover:text-yellow-300 transition-transform duration-300'>{element.title}</h1>

</div>
<div className='p-6 flex items-center gap-4'>
<img src={element.adminPhoto} alt="" className='w-12 h-12 rounded-full border-2 border-yellow-400' />
<div>
<p className='text-lg font-semibold text-gray-800'>{element.adminName}</p>
<p>New</p>
</div>

</div>

    </Link>
})
      ):(<div></div>) } 
    </div>
  )
}

export default Hero
