import React from 'react'
import { useAuth } from '../Context/AuthProvider';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const {Blogs}=useAuth();
  const blogsArray = Blogs.Blogs;
console.log(blogsArray);
 return (
      <>
      <div className=' container mx-auto p-7'>
        <h1 className='pl-5  font-semibold text-2xl '>All Blogs</h1>
        <p className='text-center mt-4'></p>
      <div className='container mx-auto my-5  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 p-10'>
  {
  blogsArray.slice(0,8).map((element)=>(
 
      <Link to={`detail/${element._id}`} key={element._id} className= ' bg-white shadow-md rounded-lg hover:shadow-lg overflow-hidden tranform hover:scale-105 transition-transform  duration-300 '>
  <div className='group relative '> 
    <img src={element.BlogImage.url} className='w-full  shadow-lg h-56 object-cover' alt="" />
    
    <h1 className='text-black text-lg font-semibold absolute bottom-8 left-2 tranform group-hover:text-yellow-300 transition-transform duration-300'>{element.title}</h1>
    <h1 className='text-slate-500 text-sm  font-semibold absolute bottom-3 left-2  tranform'>{element.category}</h1>
  
  </div>

      </Link>
  ))
}
       
      </div>

      </div>
      
      </>
    
    )
}

export default Blogs
