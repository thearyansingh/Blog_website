import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
const Detail = () => {
const {id}=useParams();
const [blogs,setBlogs]=useState({});
    useEffect(() => {
        if (id) {
          const fetchBlogDetails = async () => {
            try {
              const {data} = await axios.get(`http://localhost:4001/api/Blog/getBlog/${id}`, {
                withCredentials: true
              });
              console.log(data)

              setBlogs(data.blog);
            
              
            //   console.log(blogs)
            } catch (error) {
              toast.error('Failed to fetch blog details');
              console.error('Error fetching blog:', error);
            }
          };
    
          fetchBlogDetails();
        }
      },[id]);
         
  if (!blogs) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-500">
          <p className="text-xl font-semibold">Blog not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
  <section className="container mx-auto px-11 py-4">

 
            <div className="text-blue-500 uppercase text-xs font-bold mb-4">
              {blogs?.category}
            </div>
            <h1 className="text-4xl font-bold mb-6">{blogs?.title}</h1>
            <div className="flex items-center mb-6">
              <img
                src={blogs?.adminPhoto}
                alt="author_avatar"
                className="w-12 h-12 rounded-full mr-4"
              />
              <p className="text-lg font-semibold">{blogs?.adminName}</p>
            </div>

            <div className="flex flex-col md:flex-row">
             
                <img
                  src={blogs?.BlogImage?.url}
                  alt="mainblogsImg"
                  className="md:w-1/2 w-full h-[500   px] mb-6 rounded-lg shadow-lg cursor-pointer border"
                />
            
              <div className="md:w-1/2 w-full md:pl-6">
                <p className="text-lg mb-6"></p>
                {blogs?.about}
              </div>
            </div>
          </section>

      
    </>
  )
}

export default Detail
