import React from 'react'
import { useAuth } from '../Context/AuthProvider'
import { Link } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const Trending = () => {
  const {Blogs}=useAuth();
  const blogsArray = Blogs.Blogs;
 const responsive={
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
    return (
      
    <div >
     <h1 className="container px-10    font-semibold text-slate-500 text-2xl">Trendings
     </h1>
   
<div className='container mx-auto p-10'>
<Carousel responsive={responsive}>
        {blogsArray.length>0?(
        blogsArray.map((element)=>{
      return(
        <div
       key={element._id}
       className=' p-4 mr-5  bg-white border border-gray-400 shadow-lg rounded-lg'>
   <Link to={`detail/${element._id}`}>
        <div className='relative '> 
          <img src={element.BlogImage.url} className='w-full h-56 object-cover' alt="" />
          <button className='px-3 py-1 absolute top-3 shadow-lg text-sm left-2 font-semibold bg-blue-500 rounded-2xl text-white'>{element.category}</button>
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
        </div>
      )
        
         
        })
              ):(<div></div>) } 
              </Carousel>
            </div>
            

       
    </div>
   
    )
}

export default Trending
