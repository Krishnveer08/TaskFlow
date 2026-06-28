import { useState } from "react";
import { estimateTask } from "../../services/aiService";
import AIEstimateModal from "../ai/AIEstimateModal";

function TaskCard({ task, onDelete, onToggle, onEdit }) {
  const priorityColor = {
    High: "bg-red-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
  };
const [loading, setLoading] = useState(false);
const [open, setOpen] = useState(false);
const [estimate, setEstimate] = useState("");

const handleEstimate = async () => {
  try {
    setLoading(true);
    setOpen(true);

    const result = await estimateTask(task);

    setEstimate(result);
  } catch (err) {
    console.log(err);
    setEstimate("Unable to generate estimate.");
  } finally {
    setLoading(false);
  }
};
  

  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg p-6 hover:shadow-cyan-500/10 transition duration-300">

      {/* Top */}
      <div className="flex justify-between items-start">

        <div className="flex-1">

          <h2
            className={`text-2xl font-bold ${
              task.completed
                ? "line-through text-gray-500"
                : "text-white"
            }`}
          >
            {task.title}
          </h2>

          <p
            className={`mt-2 ${
              task.completed
                ? "line-through text-gray-500"
                : "text-gray-400"
            }`}
          >
            {task.description}
          </p>
{task.dueDate && (
  <p className="mt-2 text-sm text-cyan-300">
    📅 Due: {new Date(task.dueDate).toLocaleDateString()}
  </p>
)}
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${priorityColor[task.priority]}`}
        >
          {task.priority}
        </span>

      </div>

      

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 mt-6">
<button
  onClick={handleEstimate}
  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold"
>
  ✨ Estimate
</button>
        <button
          onClick={() => onToggle(task._id)}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            task.completed
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button
          onClick={() => onEdit(task)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
        >
          Delete
        </button>
      
      </div>
<AIEstimateModal
  open={open}
  onClose={() => setOpen(false)}
  loading={loading}
  estimate={estimate}
/>
    </div>
  );
}

export default TaskCard;