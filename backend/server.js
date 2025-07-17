import express from 'express'
import dotenv from 'dotenv'
import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/authRoutes.js"
import cabGeoFenceRoutes from "./routes/cabGeofenceRoutes.js"

import tripRoutes from "./routes/tripRoutes.js"
import cookieParser from 'cookie-parser';
import cors from 'cors'
dotenv.config();

const PORT= process.env.PORT;
const app= express();

app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true // Enable credentials if needed (e.g., cookies)
}));

app.use(express.json());


app.use("/api/auth",authRoutes);
app.use("/api/trip", tripRoutes);
app.use("/api", cabGeoFenceRoutes);

app.listen(PORT, async()=>{
    connectDB();
    console.log(`server is running on PORT : ${PORT}`);
})
