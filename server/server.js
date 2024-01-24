import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import { error } from "console";
dotenv.config();


mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log(error);
})

const app = express();

app.listen(5173, () => {
    console.log("Server running on port 5173");
})