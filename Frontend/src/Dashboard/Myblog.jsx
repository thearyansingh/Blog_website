import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Myblog = () => {
  const [myBlogs, setmyBlogs] = useState([])
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:4001/api/Blog/myBlog', {
          withCredentials: true
        });
        console.log(response.data)
        setmyBlogs(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError(error.message || 'An error occurred while fetching blogs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`http://localhost:4001/api/Blog/delete/${blogId}`, {
        withCredentials: true
      });
      // Remove the deleted blog from the state
      setmyBlogs(myBlogs.filter(blog => blog._id !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
      setError(error.message || 'An error occurred while deleting the blog');
    }
  };
  
  // Optional: Render loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="container mx-auto my-12  p-4">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:ml-60">
          {myBlogs.MyBlog && myBlogs.MyBlog.length > 0 ? (
            myBlogs.MyBlog.map((element) => (
              <div
                className="bg-white shadow-lg rounded-lg overflow-hidden"
                key={element._id}
              >
                {element?.BlogImage && (
                  <img
                    src={element?.BlogImage.url}
                    alt="blogImg"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <span className="text-sm text-gray-600">
                    {element.category}
                  </span>
                  <h4 className="text-xl font-semibold my-2">
                    {element.title}
                  </h4>
                  <div className="flex justify-between mt-4">
                    <Link
                      to={`/blog/update/${element._id}`}
                      className="text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      UPDATE
                    </Link>
                    <button
                      onClick={() => handleDelete(element._id)}
                      className="text-red-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              You have not posted any blog to see!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Myblog;