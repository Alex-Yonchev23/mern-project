import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";


dotenv.config();


mongoose
.connect(process.env.MONGO)
.then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log(error);
})

const app = express();

app.listen(5173, () => {
    console.log("Server running on port 5173");
});

app.use("/server/user" , userRoutes);
app.use("/server/auth" , authRoutes);