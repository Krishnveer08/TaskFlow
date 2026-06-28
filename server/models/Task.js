const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    dueDate: {
  type: Date,
},
    status: {
  type: String,
  enum: ["To Do", "In Progress", "Done"],
  default: "To Do",
},

    completed: {
      type: Boolean,
      default: false,
    },
    board: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Board",
  required: true,
},

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);