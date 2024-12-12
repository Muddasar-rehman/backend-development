import { Router } from "express";
import Task from "../models/task.js";
import { verifyAuthToken } from "../services/authentication.js";

const router = Router();

router.get("/tasks", async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query; 
      const tasks = await Task.find()
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
  
      const total = await Task.countDocuments();
  
      res.status(200).send({
        status: true,
        message: "Tasks fetched successfully",
        data: {
          tasks,
          pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit),
            totalTasks: total,
          },
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: false,
        message: "Internal Server Error",
      });
    }
  });
  

router.post("/", verifyAuthToken(), async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).send({ message: "Task created successfully", task });
  } catch (error) {
    res.status(400).send({ message: "Task creation failed", error });
  }
});

router.get("/:id", verifyAuthToken(), async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      res.status(200).send({ message: "Task get successfully", task });
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error fetching task", error });
  }
});

router.put("/:id", verifyAuthToken(), async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (task) {
      res.status(200).send({ message: "Task updated successfully", task });
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  } catch (error) {
    res.status(400).send({ message: "Task update failed", error });
  }
});

router.patch("/:id", verifyAuthToken(), async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (task) {
      res.status(200).send({ message: "Task updated successfully", task });
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  } catch (error) {
    res.status(400).send({ message: "Task update failed", error });
  }
});

router.delete("/:id", verifyAuthToken(), async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (task) {
      res.status(200).send({ message: "Task deleted successfully" });
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Task deletion failed", error });
  }
});

export default router;
