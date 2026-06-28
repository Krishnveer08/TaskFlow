import { useEffect, useState } from "react";
import {
  getBoards,
  createBoard,
  updateBoard,
  deleteBoard,
} from "../../services/boardService";
import toast from "react-hot-toast";

function Boards({ selectedBoard, setSelectedBoard }) {
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    loadBoards();
  }, []);

  const loadBoards = async () => {
    try {
      const data = await getBoards();
      setBoards(data);

      // Auto-select first board
      if (data.length > 0 && !selectedBoard) {
        setSelectedBoard(data[0]._id);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load boards!");
    }
  };

  const handleCreate = async () => {
    if (!title.trim()) return;

    try {
      const board = await createBoard({
        title,
      });

      setBoards((prev) => [board, ...prev]);
      setSelectedBoard(board._id);
      setTitle("");
    } catch (err) {
      console.log(err);
      toast.error("Failed to create board!");
    }
  };

  const handleEdit = async (board) => {
    const newTitle = prompt("Enter new board name", board.title);

    if (!newTitle || !newTitle.trim()) return;

    try {
      const updated = await updateBoard(board._id, {
        title: newTitle,
      });

      setBoards((prev) =>
        prev.map((b) =>
          b._id === updated._id ? updated : b
        )
      );
    } catch (err) {
      console.log(err);
      toast.error("Unable to update board");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this board and all its tasks?"
    );

    if (!confirmDelete) return;

    try {
      await deleteBoard(id);

      const updatedBoards = boards.filter(
        (board) => board._id !== id
      );

      setBoards(updatedBoards);

      if (selectedBoard === id) {
        setSelectedBoard(
          updatedBoards.length ? updatedBoards[0]._id : null
        );
      }
    } catch (err) {
      console.log(err);
      toast.error("Unable to delete board");
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-cyan-400 mb-5">
        Boards
      </h2>

      <div className="flex gap-3 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Board Name"
          className="flex-1 bg-slate-700 p-3 rounded-lg"
        />

        <button
          onClick={handleCreate}
          className="bg-cyan-500 hover:bg-cyan-600 px-5 rounded-lg"
        >
          Create
        </button>
      </div>

      <div className="space-y-3">
        {boards.map((board) => (
          <div
            key={board._id}
            className={`p-4 rounded-lg flex justify-between items-center cursor-pointer transition ${
              selectedBoard === board._id
                ? "bg-cyan-600"
                : "bg-slate-700 hover:bg-slate-600"
            }`}
          >
            <h3
              onClick={() => setSelectedBoard(board._id)}
              className="font-semibold flex-1"
            >
              {board.title}
            </h3>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(board)}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(board._id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Boards;