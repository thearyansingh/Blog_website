import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [Blogs, setBlogs] = useState();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:4001/api/Blog/get-blog', {
          method: 'GET',
          credentials: 'include',  // This allows sending cookies
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();  // Parse the JSON response
        console.log(data);
        setBlogs(data);  // Set the blogs state with the fetched data
      } catch (error) {
        console.error('Error fetching blogs:', error);  // Log any errors
      }
    };

    fetchBlogs();  // Fetch the blogs when the component mounts
  }, []);

  // Provide the blogs data to the context
  return (
    <AuthContext.Provider value={{ Blogs }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
