import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
// import axios from 'axios';

const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // Check if a photo file is selected
    if (!data.photo || data.photo.length === 0) {
      toast.error("Please select a photo.");
      return;
    }

    // Creating a FormData object for the request payload
    const formData = new FormData();
    formData.append('role', data.role);
    formData.append('yourname', data.yourname);
    formData.append('email', data.email);
    formData.append('number', data.number);
    formData.append('password', data.password);
    formData.append('education', data.education);
    formData.append('photo', data.photo[0]); // Only access photo[0] if it exists

    try {
      const response = await fetch("https://blog-website-i4ex.onrender.com/api/user/signup", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Registered successfully");

        // Assuming the token is included in the response as `result.token`
        // const token = result.register_token;

        // Save token in cookies with appropriate options
    

        console.log(result);
        navigate("/Login");
      } else {
        toast.error("Registration failed");
        console.error(result);
      }
    } catch (error) {
      toast.error("Error: " + error.message);
      console.error("Fetch error:", error);
    }

    reset();
  };

  const handleImageChange = (e) => {
    const photo = e.target.files[0];
    if (photo) {
      setImagePreview(URL.createObjectURL(photo)); // Set preview URL
    }
  };

    return (
      <>
    <div className="flex h-screen items-center justify-center  bg-gray-100 ">
      <div className='w-full max-w-md shadow-md rounded-md bg-slate-100 px-10  '>

      <div className=' text-xl font-bold text-center'>
    <span className='font-bold text-xl text-blue-500'>Blog</span>Ish
    </div>
      <form action=" " onSubmit={handleSubmit(onSubmit)} className=' flex flex-col gap-3 my-7'>
    
    <h1 className='font-bold text-md pl-2'>Register</h1>

    <div class="w-full">
    <select id="role" {...register("role", { required: true })}    class="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      defaultValue="">
        <option value="" disabled>Select Role</option>
          <option value="admin">admin</option>
          <option value="user">user</option>
    
    </select>
  </div>
  <input {...register("yourname", { required: true })} type="text" placeholder="Your Name" className="input input-bordered w-full" />
  <input {...register("email", { required: true })} type="text" placeholder="Email" className="input input-bordered w-full" />
  <input {...register("number", { required: true })} type="text" placeholder="Phone Number" className="input input-bordered w-full" />
  <input {...register("password", { required: true })} type="text" placeholder="Password" className="input input-bordered w-full" />
  <div class="w-full">
    <select id="education" {...register("education", { required: true })} class="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        defaultValue="" >
      <option value="" disabled>Select Education </option>
          <option value="BCA">Bca</option>
          <option value="MBA">MBA</option>
          <option value="BBA">BBA</option>
          <option value="BTECH">BTECH</option>

    
    </select>
  </div>
  <div className="flex items-center gap-4 mt-4">
              <div className="w-16 h-16 border border-gray-300 rounded-md overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="photo" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400 flex items-center justify-center h-full">No Image</span>
                )}
              </div>
              
              <input
                {...register("photo", { required: true })}
                type="file"
                onChange={handleImageChange} // Set image preview on file select
                className="input input-bordered w-full pt-2"
              />
            </div>

    <p className='font-semibold text-sm mt-3 text-center'>Already register??<Link to="/Login" className='text-blue-400'>login now</Link></p>
    <button className="bg-blue-500 text-white px-3 py-2 rounded-md" >Register</button>
    
      </form>
      

      
      </div>
    </div>
      </>
    )
  }

  export default Register


