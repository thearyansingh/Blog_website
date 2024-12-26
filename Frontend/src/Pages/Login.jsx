import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from 'axios';


import Cookies from 'js-cookie';
import { useAuth } from '../Context/AuthProvider';
import toast from 'react-hot-toast';

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const {setProfile,setIsAuthenticated}=useAuth();

  const onSubmit = async (data) => {
    const loginInfo = {
      role: data.role,
      email: data.email,
      password: data.password
    };

    try {
      const response = await axios.post("https://blog-website-i4ex.onrender.com/api/user/login", loginInfo, {
        withCredentials: true
      });

      if (response.data) {
        // console.log(response.data);
        const token = response.data.login_token; // Ensure your API response includes this field
        Cookies.set("token", token, { expires: 7 }); // Save the token in cookies for 7 days
        navigate("/Home");
        toast.success(response.data.message || "User login successful");

      //   setProfile(data);
      setIsAuthenticated(true)
      } else {
        toast.success (response.data.message);
        console.error();
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }

    reset();
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gray-100 ">
        <div className='w-full max-w-md shadow-md rounded-md bg-slate-100 px-10  '>
          <div className='text-xl font-bold text-center'>
            <span className='font-bold text-xl text-blue-500'>Blog</span>Ish
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 my-7'>
            <h1 className='font-bold text-md pl-2'>Login</h1>
            <div className="w-full">
              <select id="role" {...register("role", { required: true })} className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue="">
                <option value="" disabled>Select Role</option>
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
            </div>
            <input {...register("email", { required: true })} type="text" placeholder="Email" className="input input-bordered w-full" />
            <input {...register("password", { required: true })} type="text" placeholder="Password" className="input input-bordered w-full" />
            <p className='font-semibold text-sm mt-3 text-center'>New User??<Link to="/register" className='text-blue-400'>Register now</Link></p>
            <button type='submit' className="bg-blue-500 text-white px-3 py-2 rounded-md">Login</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;
