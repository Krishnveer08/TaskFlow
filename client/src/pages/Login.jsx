import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.post("/auth/login", form);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login Successful ✅");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center text-cyan-400">
          Welcome Back 👋
        </h1>

        <p className="text-center text-gray-300 mt-2">
          Login to continue your productivity journey
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-slate-800 text-white border border-slate-600 focus:border-cyan-400 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-slate-800 text-white border border-slate-600 focus:border-cyan-400 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 py-4 rounded-xl font-bold transition"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-6 text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-400 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;