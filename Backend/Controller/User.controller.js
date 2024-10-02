import User from "../Modal/UserModal.js";
import { v2 as cloudinary } from 'cloudinary';
// import fileUpload from "express-fileupload";
// import bcrypt from "bcryptjs"


export const signUp = async (req, res) => {
  try {
    // Ensure a file is uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "User photo is required" });
    }
// request the  file upload 
    const photo = req.files.photo;
    console.log("Uploaded File:", photo);

    // Check if the file format is allowed
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(photo.mimetype)) {
      return res.status(400).json({ message: "Invalid photo format" });
    }

    const { yourname, email, password,number, education, role } = req.body;
    console.log(req.body);

    // Ensure all required fields are provided
    if (!email || !yourname || !password || !number || !education || !role || !photo) {
      return res.status(400).json({ message: "Please fill required fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Upload photo to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error("Cloudinary Upload Error:", cloudinaryResponse.error || "Unknown error");
      return res.status(500).json({ message: "Failed to upload photo" });
    }

    console.log("Cloudinary Response:", cloudinaryResponse);
// const hashPassword=await bcrypt.hash(password,10);
    // Create a new user 
    const newUser = new User({
      yourname,
      email,
      password, // You may want to hash the password before saving
      number,
      education,
      role,
      photo: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      }
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

