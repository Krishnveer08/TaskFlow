function SearchBar({ search, setSearch }) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="🔍 Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-cyan-400"
      />
    </div>
  );
}

export default SearchBar;