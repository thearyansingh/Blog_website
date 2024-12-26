import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';

const Blogcreate = () => {
  const { register, handleSubmit, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!data.BlogImage || data.BlogImage.length === 0) {
      toast.error("Please select an image.");
      return;
    }
    console.log("data")
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('category', data.category);
    formData.append('about', data.about);
    formData.append('BlogImage', data.BlogImage[0]);

    try {
      const response = await fetch("https://blog-website-i4ex.onrender.com/api/Blog/create", {
        method: "POST",
        credentials: 'include', // Include cookies in the request
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Blog created successfully!");
        console.log("Blog created:", result);
        navigate('/'); // Redirect to another page (optional)
        reset();
        setImagePreview(null);
      } else {
        toast.error(result.message || "Failed to create the blog.");
        console.error("Error:", result);
      }
    } catch (error) {
      toast.error("Error: " + error.message);
      console.error("Fetch error:", error);
    }
  };

  const handleImageChange = (e) => {
    const BlogImage = e.target.files[0];
    if (BlogImage) {
      setImagePreview(URL.createObjectURL(BlogImage));
    } else {
      setImagePreview(null); // Clear preview if no file is selected
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md shadow-md rounded-md bg-slate-100 px-10">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 my-7">
          <h1 className="font-bold text-md pl-2">Create Blog</h1>

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
              defaultValue=""
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Traditional">Traditional</option>
              <option value="Sports">Sports</option>
              <option value="Devotional">Devotional</option>
              <option value="Fictional">Fictional</option>
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
              {...register("BlogImage", { required: "Image is required" })}
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Blogcreate;
