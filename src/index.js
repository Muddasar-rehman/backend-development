import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import { connectDB } from "./middleware/db.js";
import userRoutes from "./routers/user.js";
import taskRoutes from "./routers/task.js";

dotenv.config();
const server = express();
connectDB();



server.use(cors());
server.options("*", cors());
server.use(express.json({ limit: "50mb", extended: true }));



server.use("/users", userRoutes);
server.use("/tasks", taskRoutes);


const port = process.env.PORT || 5003;
server.listen(port, () => {
  console.log("Server listening on port " + `${port}`);
});

export default server;
