
import { v2 as cloudinary } from 'cloudinary';
import Blog from '../Modal/BlogModal.js';
import mongoose from 'mongoose';

// to create the blog
export const createBlog = async (req, res) => {
    try {
      // Ensure a file is uploaded
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: "Blog image is required" });
      }
  // request the  file upload 
      const BlogImage = req.files.BlogImage;
    //   console.log("Uploaded File:", BlogImage);
  
      // Check if the file format is allowed
      const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedFormats.includes(BlogImage.mimetype)) {
        return res.status(400).json({ message: "Invalid photo format" });
      }
  
      const { title, category, about } = req.body;
    //   console.log(req.body);
  
      // Ensure all required fields are provided
      if (!title || !category || !about) {
        return res.status(400).json({ message: "title category about field required" });
      }
  const adminName=req.user.yourname;
  const adminPhoto=req.user.photo;
  const createdBy=req.user._id;
      
  
      // Upload photo to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(BlogImage.tempFilePath);
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Upload Error:", cloudinaryResponse.error || "Unknown error");
        return res.status(500).json({ message: "Failed to upload photo" });
      }
  
    //   console.log("Cloudinary Response:", cloudinaryResponse);

      // Create a new user 
      const BlogData = new Blog({
    title,
    category,
    about,
    adminName,
    adminPhoto,
    createdBy,
        BlogImage: {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.url,
        }
      });
  
      // Save the user to the database
   const blog=await Blog.create(BlogData);
    //  const  token= await createTokenAndSaveCookies(newUser._id,res)
    //  console.log(token);
      res.status(201).json({ 
        message: "Blog created successfully",
        blog, });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };


  //to delete the blog
  export const deleteBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await Blog.findById(id);
  
      // Check if blog exists
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      // Delete blog if found
      await blog.deleteOne();
      return res.status(200).json({ message: "Blog deleted successfully" });
  
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };


//this function is used to get all the blogs 
  export const allblog=async(req,res)=>{
try {
  const getblog= await Blog.find();
  return res.status(200).json({Blogs:getblog});
} catch (error) {
  return  res.status(500).json({message:"internal server error"});
}
  }
  

  // this function is use to get the seperate blog from the database
  export const BlogById=async(req,res)=>{
    try {
     const {id}=req.params;
     if(!mongoose.Types.ObjectId(id)){
      return   res.status(401).json({message:"invalid id"});
     }
      const getblog= await Blog.findById(id);
      return  res.status(200).json({userBlog:getblog});
    } catch (error) {
      return res.status(500).json({message:"internal server error"});
    }
      }


      export const MyBlog=async(req,res)=>{
        try {
         const createdBy=req.user._id;
         
          const getblog= await Blog.find({createdBy});
        return  res.status(200).json({MyBlog:getblog});
        } catch (error) {
         return res.status(500).json({message:"internal server error"});
        }
          }

          export const UpdateBlog = async (req, res) => {
            try {
              const { id } = req.params;
          
              // Validate the ID format
              if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid blog ID" });
              }
          
              // Update the blog and return the updated document
              const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
          
              // Check if the blog was found and updated
              if (!updatedBlog) {
                return res.status(404).json({ message: "Blog not found or not updated" });
              }
          
              return res.status(200).json({ updatedBlog });
            } catch (error) {
              return res.status(500).json({ message: "Internal server error" });
            }
          };
