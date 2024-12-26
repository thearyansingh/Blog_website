import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { Link } from 'react-router-dom';

const PopularCreator = () => {
  const [adminData, setAdminData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://blog-website-i4ex.onrender.com/api/user/alladmin");
      
        setAdminData(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    <div>
      <h1 className='font-semibold text-2xl ml-10  '>Popular Creator</h1>
    <div className="container mx-auto  grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 p-10">
        {adminData.admins && adminData.admins.slice(0,4).map((element) => (
          <Link
            to="/"
            key={element._id}
          
          >
            <div className="group relative">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"
                className="w-full p-5 shadow-lg rounded-full border-spacing-2 border-gray-500 h- object-cover"
                alt=""
              />
            </div>
            <div className="flex-col gap-5 text-center">
              <h2>{element.yourname}</h2>
              <h3>Author</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  
    </>
  );
};

export default PopularCreator;
