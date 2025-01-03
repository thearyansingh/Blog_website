import React, { useState } from 'react'
import { useAuth } from '../Context/AuthProvider';
import Sidebar from '../Dashboard/Sidebar';
import Myprofile from '../Dashboard/MyProfile';
import Myblog from '../Dashboard/Myblog';
import Blogcreate from '../Dashboard/Blogcreate';

import Blogupdate from '../Dashboard/Blogupdate';

const Dashboard = () => {
  const {profile,isAuthenticated}=useAuth();
 const [component,setComponent]=useState("My blogs")
  
  return (
    <>
  <div>
    <Sidebar component={component} setComponent={setComponent}/>
    {component==="My Profile"?(<Myprofile/>):
     component==="create Blog"?(
<Blogcreate/>
     ):
     component === "update Blog"?(
     <Blogupdate/>
    ):
     (<Myblog/>)
    }
  </div>
     
    </>
  )
}

export default Dashboard
