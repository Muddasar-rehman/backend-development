import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../services/authentication.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).send({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).send({ message: "Registration failed", error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateAccessToken(user);
      res.status(200).send({ message: "Login successful", token });
    } else {
      res.status(401).send({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

export default router;
