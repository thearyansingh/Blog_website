import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthProvider';

const MyProfile = () => {
   const {profile}=useAuth();
   console.log(profile?.profile)

  return (
     <>
     <div className='flex  min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 glass '>
     <div className="flex flex-col gap-5  bg-base-100 shadow-xl px-16  py-14 rounded-lg ">
  <figure>
    <img
      src={profile.profile.photo.url}
      alt="Movie"
      className='w-80 rounded-lg'/>
  
  </figure>
  <div className="">
    <h2 className="card-title ">{profile.profile.yourname}</h2>
    <p>{profile.profile.email}</p>
    <p>{profile.profile.number}</p>

    <p>{profile.profile.education}</p>

    <p>{profile.profile.role}</p>


    
 
  </div>
</div>
     </div>

   
     </>
   );
}

export default MyProfile
