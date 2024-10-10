import createTokenAndSaveCookies from "../jwt/AuthToken.js";
import User from "../Modal/UserModal.js";
import { v2 as cloudinary } from 'cloudinary';
// import fileUpload from "express-fileupload";
import bcrypt from "bcryptjs"


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
const hashPassword=await bcrypt.hash(password,10);
    // Create a new user 
    const newUser = new User({
      yourname,
      email,
      password:hashPassword, // You may want to hash the password before saving
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
   const  token= await createTokenAndSaveCookies(newUser._id,res)
   console.log(token);
    res.status(201).json({ message: "User created successfully", user: newUser,register_token:token });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// for login
export const login=async(req,res)=>{
const {email,password,role}=req.body;
try {
  if(!email||!password||!role){
    return res.status(400).json({message:"please fill required fields"});

  }
  const user=await User.findOne({email}).select("+password");
  if(!user.password){
    return res.status(400).json({message:"user password is missing"});
  }
  const ismatch=await bcrypt.compare(password,user.password)
if(!user||!ismatch){
return res.status(400).json({message:"invalid email and password"})
}
if(user.role!==role){
  res.status(403).json({message:`given role ${role} not found`})
}
const  token= await createTokenAndSaveCookies(user._id,res)
console.log(token)
res.status(201).json({ message: "User login successfully", user:{
  _id:user._id,
  yourname:user.yourname,
  email:user.email,
  education:user.education,
  role:user.role 
},login_token:token,
 });
 



} catch (error) {
 return res.status(500).json({error:"Internal server error"}) 
}
};

export const logout=(req,res)=>{
try {
  res.clearCookie("jwt")
res.status(200).json({message:"user logout successfully"})
} catch (error) {
  res.status(500).json({message:"internal server error"})
}
}
// to get my profile
export const myProfile = (req, res) => {
  try {
    const myProfile = req.user; 
    
    if (!myProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    return res.status(200).json({ message: 'Profile fetched successfully', profile: myProfile });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const allAdmin=async(req,res)=>{
try {
const alladmin=await User.find({role:"admin"});
return res.status(200).json({message:"all admin in database",admins:alladmin});
} catch (error) {
  return res.status(500).json({message:"internal server error"})
}
}






