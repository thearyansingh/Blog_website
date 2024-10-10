import mongoose from "mongoose";
// import validator from "validator"
const BlogSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
       },
       BlogImage:{
       public_id:{
        type:String,
        required:true
       },
       url:{
        type:String,
        required:true,
       }
       },
       category:{
        type:String,
        required:true,
        
       },
       about:{
        type:String,
        required:true,
        minlenth:[200,"should contain 200 characteter"]
       },
       adminName:{
        type:String,
        // required:true
       },
       adminPhoto:{
        type:String,
        // required:true
       },
       createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
       }
    

})
const Blog=mongoose.model("Blog",BlogSchema);
export default Blog;