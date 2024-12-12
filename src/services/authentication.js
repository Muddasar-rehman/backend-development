import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
dotenv.config();

export const generateAccessToken = (user) => {
  const payload = { id: user._id };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const verifyAuthToken = () => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Token not found or invalid" });
      }

      const token = authHeader.split(" ")[1]; 
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded); 

      
      const u_id = decoded.id; 

      const user = await User.findById(u_id);
      if (!user) {
        return res.status(401).json({ message: "User not authorized" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};