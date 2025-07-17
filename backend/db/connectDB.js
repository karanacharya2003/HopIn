import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

const connectDB = async ()=>{
    try {
        
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("connected to DB");

    } catch (error) {
        console.log(`Error while connecting to DB :${error}`)
    }
}

export default connectDB;
