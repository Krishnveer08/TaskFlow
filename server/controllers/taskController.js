const Task = require("../models/Task");

// =============================
// Create Task
// =============================
const createTask = async (req, res) => {
  try {
    const {
  title,
  description,
  priority,
  board,
  status,
  dueDate,
} = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

   const task = await Task.create({
  title,
  description,
  priority,
  status: status || "To Do",
  board,
  dueDate,
  user: req.user._id,
  
});

    res.status(201).json({
      success: true,
      message: "Task Created Successfully",
      task,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Get All Tasks
// =============================
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Update Task
// =============================
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

   task.title = req.body.title || task.title;
task.description = req.body.description || task.description;
task.priority = req.body.priority || task.priority;
if (req.body.dueDate !== undefined) {
  task.dueDate = req.body.dueDate;
}
task.board = req.body.board || task.board;
task.status = req.body.status || task.status;

    if (req.body.completed !== undefined) {
      task.completed = req.body.completed;
    }

    const updatedTask = await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Delete Task
// =============================
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =============================
// Clear All Tasks
// =============================
const clearAllTasks = async (req, res) => {
  try {
    await Task.deleteMany({
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      message: "All tasks deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  clearAllTasks,
};
  
