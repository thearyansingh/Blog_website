import mongoose from "mongoose";
import validator from "validator"
const userSchema=mongoose.Schema({
    yourname:{
        type:String,
        required:true
       },
       email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"enter a valid email"]
       },
    number:{
        type:String,
        required:false,
        unique:true
       },
       password:{
        type:String,
        required:true,
        
       },
       photo:{
       public_id:{
        type:String,
        required:true
       },
       url:{
        type:String,
        required:true,
       }
       },
       education:{
        type:String,
        required:true
       },
       role:{
        type:String,
        required:true,
        enum:["user","admin"],
       },
       token:{
        type:String
       },
       createdAt:{
        type:Date,
        default:Date.now,
       },
    

})
const User=mongoose.model("User",userSchema);
export default User;