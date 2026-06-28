const Board = require("../models/Board");
const Task = require("../models/Task");

// =========================
// Create Board
// =========================
const createBoard = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Board title is required",
      });
    }

    const board = await Board.create({
      title,
      description,
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      board,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get All Boards
// =========================
const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      boards,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =========================
// Delete Board
// =========================
const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board) {
      return res.status(404).json({
        success: false,
        message: "Board not found",
      });
    }

    if (board.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Delete all tasks inside this board
    await Task.deleteMany({
      board: board._id,
    });

    // Delete board
    await board.deleteOne();

    res.status(200).json({
      success: true,
      message: "Board deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =========================
// Update Board
// =========================
const updateBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board) {
      return res.status(404).json({
        success: false,
        message: "Board not found",
      });
    }

    if (board.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    board.title = req.body.title || board.title;
    board.description = req.body.description || board.description;

    const updatedBoard = await board.save();

    res.status(200).json({
      success: true,
      board: updatedBoard,
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
  createBoard,
  getBoards,
  updateBoard,
  deleteBoard,
};