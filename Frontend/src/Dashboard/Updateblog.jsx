import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import axios from 'axios';

const Updateblog = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  
  // Fetch blog details when component mounts if blogId exists

  
  useEffect(() => {
    if (id) {
      const fetchBlogDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:4001/api/Blog/getBlog/${id}`, {
            withCredentials: true
          });
          
          const blogData = response.data;
          console.log(blogData)
          // Set form values
          setValue('title', blogData.title);
          setValue('category', blogData.category);
          setValue('about', blogData.about);
          
          // Set image preview if exists
          if (blogData.BlogImage && blogData.BlogImage.url) {
            setImagePreview(blogData.BlogImage.url);
          }
        } catch (error) {
          toast.error('Failed to fetch blog details');
          console.error('Error fetching blog:', error);
        }
      };

      fetchBlogDetails();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('category', data.category);
    formData.append('about', data.about);

    // Append image if selected
    if (data.BlogImage && data.BlogImage.length > 0) {
      formData.append('BlogImage', data.BlogImage[0]);
    }

    try {
      // Update blog API call
      const response = await axios.put(
        `http://localhost:4001/api/Blog/updateBlog/${id}`, 
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log(response.data)
      ('Blog updated successfully');
      toast.success(error.response?.data?.message || 'Updated successfully');


      navigate('/'); // Redirect after successful update
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update blog');
      console.error('Update error:', error);
    }
  };

  const handleImageChange = (e) => {
    const BlogImage = e.target.files[0];
    if (BlogImage) {
      setImagePreview(URL.createObjectURL(BlogImage));
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md shadow-md rounded-md bg-slate-100 px-10">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 my-7">
          <h1 className="font-bold text-md pl-2">Update Blog</h1>

          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            placeholder="Enter title"
            className="input input-bordered w-full"
          />

          <div className="w-full">
            <select
              id="category"
              {...register("category", { required: "Category is required" })}
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="BCA">BCA</option>
              <option value="MBA">MBA</option>
              <option value="BBA">BBA</option>
              <option value="BTECH">BTECH</option>
            </select>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div className="w-24 h-16 border border-gray-300 rounded-md overflow-hidden">
              {imagePreview ? (
                <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 flex items-center justify-center h-full">No Image</span>
              )}
            </div>

            <input
              {...register("BlogImage")}
              type="file"
              onChange={handleImageChange}
              className="input input-bordered w-full pt-2"
            />
          </div>

          <textarea
            {...register("about", { required: "About section is required" })}
            placeholder="About Blog"
            className="w-full p-2 border border-gray-300 rounded-md resize-none"
            rows="5"
          />

          <button className="bg-blue-500 text-white px-3 py-2 rounded-md" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default Updateblog;