import React from 'react'
import { IoMdCall } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';
const Contact = () => {
  const { register, handleSubmit,reset, formState: { errors } } = useForm();
  const onSubmit =async(data) =>{
    console.log(data)
const userInfo={
  access_key:"5a3320e6-db90-4f99-867e-0f3760e8c918",
  name:data.name,
  email:data.email,
  message:data.message
}
  try {
    await axios.post("https://api.web3forms.com/submit",userInfo)
    toast.success("email sent successfully");
  } catch (error) {
    console.log(error)
    toast.success("email not sent");
  }
  reset();
}


  


   
  return (
    <>
    <div className='flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8  bg-gray-50 ' >
      <div className='max-w-4xl w-full sapce-y-8 p-10   bg-white shadow-xl rounded-lg  '>
       
        <h1 className='text-center font-bold text-2xl mb-8 md:mb-9  text-blue-500  '>Contact Us</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col md:flex-row justify-between'>
        <div className=' w-full flex flex-col gap-4 mr-8 '>
        <p className='text-lg font-bold '>Send us a message</p>
<input  {...register("name", { required: true })}  type="text" placeholder="Your Name" className="input input-bordered w-full" />
{errors.name && <span>This field is required</span>}
<input  {...register("email", { required: true })}  type="email" placeholder="Your email" className="input input-bordered w-full" />
{errors.email && <span>This field is required</span>}
<textarea
 {...register("message", { required: true })}
 
        placeholder="Type your message here..."
        className="w-full p-2 border border-gray-300 rounded-md resize-none"
        rows="5"
      ></textarea>
      {errors.message && <span>This field is required</span>}

    <button type='submit' className="bg-blue-500 text-white px-3 py-2 rounded-md" >Send Message</button>
        </div>

    <div className='flex flex-col mx-auto mt-4 gap-3  '>
<p className='font-semibold '>Contact Information</p>
<div className='flex items-center gap-4  '>
<IoMdCall /><p>+918009017***</p>
</div>
<div className='flex items-center gap-4  '>
<MdMessage />
<p>singharyan5656@gmail.com</p>
</div >
<div className='flex items-center gap-4  '>
<FaLocationDot />
<p>Noida,Uttar pradesh</p>
</div>




    </div>
    <div>

    </div>
  </form>
      </div>
   
    </div>

    </>
  )
}


export default Contact
