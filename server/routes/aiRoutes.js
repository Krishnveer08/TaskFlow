const express = require("express");
const {
  askAI,
  estimateTask,
} = require("../controllers/aiController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, askAI);

router.post("/estimate", protect, estimateTask);

module.exports = router;