const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  clearAllTasks,
} = require("../controllers/taskController");


const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.delete("/clear", protect, clearAllTasks); // <-- first
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;