function FilterBar({ filter, setFilter }) {
  return (
    <div className="flex gap-3 mb-6">

      <button
        onClick={() => setFilter("All")}
        className={`px-5 py-2 rounded-lg ${
          filter === "All"
            ? "bg-cyan-500"
            : "bg-slate-700"
        }`}
      >
        All
      </button>

      <button
        onClick={() => setFilter("Completed")}
        className={`px-5 py-2 rounded-lg ${
          filter === "Completed"
            ? "bg-green-500"
            : "bg-slate-700"
        }`}
      >
        Completed
      </button>

      <button
        onClick={() => setFilter("Pending")}
        className={`px-5 py-2 rounded-lg ${
          filter === "Pending"
            ? "bg-red-500"
            : "bg-slate-700"
        }`}
      >
        Pending
      </button>

    </div>
  );
}

export default FilterBar;