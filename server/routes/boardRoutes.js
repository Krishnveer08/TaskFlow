const express = require("express");
const {
  createBoard,
  getBoards,
  updateBoard,
  deleteBoard,
} = require("../controllers/boardController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(protect, getBoards)
  .post(protect, createBoard);

router
  .route("/:id")
  .put(protect, updateBoard)
  .delete(protect, deleteBoard);

module.exports = router;