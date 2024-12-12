import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const db = process.env.BACKEND_URI;
export async function connectDB() {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB is not connected");
    console.error(error.message);
    process.exit(1);
  }
}
