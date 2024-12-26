import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [Blogs, setBlogs] = useState({ Blogs: [] });
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("token"); // Get the token from cookies
        if (token) {
          const { data } = await axios.get("https://blog-website-i4ex.onrender.com/api/user/my-profile", {
            headers: {
              "Authorization": `Bearer ${token}`, // Include the token in the header
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });

          // console.log(data);
          setProfile(data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false); // Set false if there's an error fetching profile
      }
    };

    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://blog-website-i4ex.onrender.com/api/Blog/get-blog');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
    fetchProfile(); // Fetch profile when the component mounts
  }, []);


  return (
    <AuthContext.Provider value={{
      Blogs,
      profile,
      setProfile,
      isAuthenticated,
      setIsAuthenticated,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
