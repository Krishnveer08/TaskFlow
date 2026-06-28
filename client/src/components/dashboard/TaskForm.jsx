import { useState } from "react";
import { useEffect } from "react";
import { getBoards } from "../../services/boardService";
import toast from "react-hot-toast";
function TaskForm({ onAdd }) {
 const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [priority, setPriority] = useState("Medium");
const [dueDate, setDueDate] = useState("");
const [boards, setBoards] = useState([]);
const [board, setBoard] = useState("");

  

useEffect(() => {
  const loadBoards = async () => {
    try {
      const data = await getBoards();

      setBoards(data);

      if (data.length > 0) {
        setBoard(data[0]._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  loadBoards();
}, []);
  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Task title is required!");
      return;
    }
    if (!board) {
      toast.error("Please select a board!");
      return;
}

   try {
 await onAdd({
  title,
  description,
  priority,
  board,
  dueDate,
});
toast.success("Task added successfully!");
  setTitle("");
  setDescription("");
  setPriority("Medium");
  setDueDate("");
} catch (err) {
  toast.error("Failed to add task!");
  console.error(err);
}
  };

  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">
        Add New Task
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-slate-700 p-3 rounded-lg outline-none border border-slate-600 focus:border-cyan-400"
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="w-full bg-slate-700 p-3 rounded-lg outline-none border border-slate-600 focus:border-cyan-400 resize-none"
        />

        <div className="grid md:grid-cols-2 gap-4">

  <select
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
    className="bg-slate-700 p-3 rounded-lg border border-slate-600"
  >
    <option>High</option>
    <option>Medium</option>
    <option>Low</option>
  </select>

  <select
    value={board}
    onChange={(e) => setBoard(e.target.value)}
    className="bg-slate-700 p-3 rounded-lg border border-slate-600"
  >
    <option value="">Select Board</option>

    {boards.map((item) => (
      <option key={item._id} value={item._id}>
        {item.title}
      </option>
    ))}
  </select>

  <input
    type="date"
    value={dueDate}
    onChange={(e) => setDueDate(e.target.value)}
    className="md:col-span-2 bg-slate-700 p-3 rounded-lg border border-slate-600"
  />

</div>
       

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 transition duration-300 py-3 rounded-lg font-bold text-lg"
        >
          Add Task
        </button>

      </form>
    </div>
  );
}

export default TaskForm;