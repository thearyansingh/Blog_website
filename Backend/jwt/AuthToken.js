import jwt from "jsonwebtoken"
import User from "../Modal/UserModal.js"
const createTokenAndSaveCookies= async(userId,res)=>{
const token=jwt.sign({userId},process.env.JWT_SECRET_KEY,{
    expiresIn:"7d"
})
res.cookie("jwt", token, {
  httpOnly: true, // Prevents XSS attacks
  secure: process.env.NODE_ENV === "production", // Set true only in production (HTTPS)
  sameSite: "None", // Helps mitigate CSRF attacks; required for cross-origin requests
});
await User.findByIdAndUpdate(userId,{token})
return token;
}
export default createTokenAndSaveCookies;