import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Creators = () => {
  const [heyadmin, setAdmin] = useState ([]);
  useEffect(() => {
    const fetchData=async()=>{
try {
  const res= await axios.get("http://localhost:4001/api/user/alladmin")
  console.log(res.data);
  setAdmin(res.data);
} catch (error) {
  alert(message.error);
}
    }
    fetchData();
  }, [])
  
    return (
      <div className='container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 p-10'>
  {heyadmin.admins && heyadmin.admins.slice(0,5).map((element)=>{
  return  <div key={element._id} className='bg-white shadow-xl rounded-lg hover:shadow-lg overflow-hidden tranform hover:scale-105 transition-transform  duration-300 '>
  <div className='group relative '> 
    <img src={element.photo.url} className='w-full h-56 object-cover' alt="" />
    <div className='absolute inset-x-0 bottom-0 transform translate-y-1/2'>
<img className='w-12 h-12 mx-auto   rounded-full border-4 border-gray-400'  src={element.photo.url} alt="" />
    </div>

  
  </div>
  <div className='py-5 mt-4 flex-col  text-center '>
  <h2 className='font-semibold text-gray-600 text-lg'>{element.yourname}</h2>
  <p className='font-medium text-gray-500 text-sm mt-2 ' >{element.email}</p>
  <p className='font-medium text-gray-500 text-sm mt-2 '>{element.number}</p>
  <p className='font-medium text-gray-500 text-sm  mt-2'>{element.role}</p>
  </div>
  
  </div>
    
      
  })
  
}

    
      </div>
    )
  }

export default Creators
