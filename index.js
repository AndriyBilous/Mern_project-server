import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // Allow our backend to work with different ip-addresses

import authRoute from "./routes/auth.js";

const app = express();

// adding dotenv library for constants storage
dotenv.config();

// Constants
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// Middleware (function that stretch or expand our settings of express)
app.use(cors());
app.use(express.json()); //so backend know that all info from frontend will be send in json format

// Routes
// http://localhost:3002
app.use("/api/auth", authRoute);

async function start() {
  // connecting to mongoDB
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.v0rzcgf.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
