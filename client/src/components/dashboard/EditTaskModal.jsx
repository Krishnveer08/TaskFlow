import { useEffect, useState } from "react";

function EditTaskModal({
  isOpen,
  task,
  onClose,
  onSave,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : "");
    }
  }, [task]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...task,
      title,
      description,
      priority,
      dueDate,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-slate-800 rounded-2xl w-full max-w-lg p-8">

        <h2 className="text-3xl font-bold mb-6">
          Edit Task
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-700 p-3 rounded-lg"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-slate-700 p-3 rounded-lg"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full bg-slate-700 p-3 rounded-lg"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
              <input
  type="date"
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
  className="w-full bg-slate-700 p-3 rounded-lg border border-slate-600 mt-4"
/>
          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 px-6 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              className="bg-cyan-500 px-6 py-2 rounded-lg"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditTaskModal;