const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const aiRoutes = require("./routes/aiRoutes");
const boardRoutes = require("./routes/boardRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "TaskFlow API is Running 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/boards", boardRoutes);
module.exports = app;