import mongoose from "mongoose";
import {dotenv} from "dotenv";

// dotenv.config();

const connectDB = async() =>{
    if (mongoose.connection.readyState === 0) {
        try {
          await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://shahsagar2006:JsADKCf2UaBDmOow@expensetracker.n4mmy.mongodb.net/?retryWrites=true&w=majority&appName=expensetracker')
          console.log("MongoDB connected");
        } catch (error) {
          console.error("MongoDB connection error:", error);
          process.exit(1);
        }
      }
    };
    
    export default connectDB;