import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import userRoute from "./Routes/userRoute.js"
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary';
const app = express()

dotenv.config();
const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL;


app.use(express.json());
// file upload
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))

app.use("/api/user",userRoute)
//CLOUDINARY
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_SECRET_KEY
})


// MongoDB connection
mongoose.set("strictQuery", false);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    
    console.log('Connected to MongoDB');
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Node API app is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


  export default app;