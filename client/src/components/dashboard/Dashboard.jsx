import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Sidebar from "../../layouts/Sidebar";
import Topbar from "../../layouts/Topbar";
import API from "../../services/api";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";
import EditTaskModal from "./EditTaskModal";
import Boards from "../boards/Boards";
import Kanban from "../kanban/Kanban";
import { useTheme } from "../../context/ThemeContext";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
const [loading, setLoading] = useState(true);
const [view, setView] = useState("list");
const { colors } = useTheme();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

 const fetchTasks = async () => {
  try {
    setLoading(true);

    const { data } = await API.get("/tasks");
    console.log(data.tasks);

    setTasks(data.tasks);


  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchTasks();
}, []);

 const addTask = async (taskData) => {
  try {
    const { data } = await API.post("/tasks", taskData);

    setTasks((prev) => [data.task, ...prev]);
  } catch (err) {
    console.log(err);
    toast.error("Unable to create task");
  }
};

 
  const deleteTask = async (id) => {
  try {
    await API.delete(`/tasks/${id}`);

    setTasks((prev) =>
      prev.filter((task) => task._id !== id)
    );
  } catch (err) {
    console.log(err);
    toast.error("Unable to delete task");
  }
};

  const toggleTask = async (id) => {
    try {
      const { data } = await API.put(`/tasks/${id}`, { completed: !tasks.find((task) => task._id === id).completed });

      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? data.task : task
        )
      );
    } catch (err) {
      console.log(err);
      toast.error("Unable to update task");
    }
  };

  const openEditModal = (task) => {
  setEditingTask(task);
  setIsModalOpen(true);
};

 const saveEditedTask = async (updatedTask) => {
  try {
    const { data } = await API.put(
      `/tasks/${updatedTask._id}`,
      updatedTask
    );

    setTasks((prev) =>
      prev.map((task) =>
        task._id === data.task._id ? data.task : task
      )
    );

    setIsModalOpen(false);
    setEditingTask(null);
  } catch (err) {
    console.log(err);
    toast.error("Unable to update task");
  }
};
console.log("selectedBoard:", selectedBoard);

tasks.forEach((task) => {
  console.log("Task Board:", task.board);
});
 const filteredTasks = tasks.filter((task) => {
  // Board Filter
  if (selectedBoard) {
    const taskBoardId =
      typeof task.board === "object"
        ? task.board._id
        : task.board;

    if (taskBoardId !== selectedBoard) {
      return false;
    }
  }

  // Search Filter
  const matchesSearch =
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description.toLowerCase().includes(search.toLowerCase());

  // Status Filter
  if (filter === "Completed") {
    return matchesSearch && task.completed;
  }

  if (filter === "Pending") {
    return matchesSearch && !task.completed;
  }

  return matchesSearch;
});
  

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  return (
    <div className={`flex min-h-screen ${colors.page}`}>

      <Sidebar />

      <div className="flex-1 p-8">

        <Topbar />

        {/* Stats */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-8">

         <div className={`${colors.card} rounded-2xl p-6 shadow-lg`}>
           <h3 className={colors.subText}>
              Total Tasks
            </h3>

            <p className="text-5xl font-bold text-cyan-400 mt-3">
              {totalTasks}
            </p>
          </div>

          <div className="bg-green-600 rounded-2xl p-6 shadow-lg">
            <h3>Completed</h3>

            <p className="text-5xl font-bold mt-3">
              {completedTasks}
            </p>
          </div>

          <div className="bg-red-600 rounded-2xl p-6 shadow-lg">
            <h3>Pending</h3>

            <p className="text-5xl font-bold mt-3">
              {pendingTasks}
            </p>
          </div>

          <div className="bg-orange-500 rounded-2xl p-6 shadow-lg">
            <h3>High Priority</h3>

            <p className="text-5xl font-bold mt-3">
              {highPriorityTasks}
            </p>
          </div>

        </div>
        {/* Boards */}

        <div className="mt-8">
        <Boards
  selectedBoard={selectedBoard}
  setSelectedBoard={setSelectedBoard}
/>
        </div>
        {/* Search */}

        <div className="mt-10">
          <SearchBar
            search={search}
            setSearch={setSearch}
          />
        </div>

        {/* Filter */}

        <div className="mt-5">
          <FilterBar
            filter={filter}
            setFilter={setFilter}
          />
        </div>

        {/* Task Form */}

        <div className="mt-8">
          <TaskForm
  onAdd={addTask}
/>
        </div>
<div className="flex gap-3 mt-8 mb-6">

  <button
    onClick={() => setView("list")}
    className={`px-5 py-2 rounded-lg font-semibold ${
      view === "list"
        ? "bg-cyan-500"
        : "bg-slate-700"
    }`}
  >
    📋 List View
  </button>

  <button
    onClick={() => setView("kanban")}
    className={`px-5 py-2 rounded-lg font-semibold ${
      view === "kanban"
        ? "bg-cyan-500"
        : "bg-slate-700"
    }`}
  >
    📊 Kanban
  </button>

</div>
        {/* Task List */}

<div className="mt-10">

  <h2 className="text-3xl font-bold mb-6">
    Today's Tasks
  </h2>

  {loading ? (
  <div className={`${colors.card} rounded-xl p-10 text-center text-cyan-400`}>
    Loading Tasks...
  </div>
) : view === "kanban" ? (
  <Kanban
  tasks={filteredTasks}
  refreshTasks={fetchTasks}
/>
) : filteredTasks.length === 0 ? (
 <div className={`${colors.card} rounded-xl p-10 text-center ${colors.subText}`}>
    No Tasks Found
  </div>
) : (
  <div className="space-y-5">
    {filteredTasks.map((task) => (
      <TaskCard
        key={task._id}
        task={task}
        onDelete={deleteTask}
        onToggle={toggleTask}
        onEdit={openEditModal}
      />
    ))}
  </div>
)}
        
  </div>

      </div>

      <EditTaskModal
        isOpen={isModalOpen}
        task={editingTask}
        onClose={() => setIsModalOpen(false)}
        onSave={saveEditedTask}
      />

    </div>
  );
}

export default Dashboard;