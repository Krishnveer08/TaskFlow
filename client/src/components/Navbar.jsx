import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-6">
      <h1 className="text-3xl font-bold text-cyan-400">
        TaskFlow
      </h1>

      <div className="space-x-5">
        <Link
          to="/login"
          className="hover:text-cyan-400 transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-cyan-500 px-5 py-2 rounded-lg hover:bg-cyan-600 transition"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;