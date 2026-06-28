import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
function Topbar() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
  className={`flex justify-between items-center ${colors.card} p-5 rounded-xl`}
>

      <h2 className={`text-3xl font-bold ${colors.text}`}>
        Dashboard
      </h2>

      <div className="flex gap-5 items-center">

        <button
          className="text-2xl hover:scale-110 transition"
        >
          🔔
        </button>

        <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center font-bold">
          K
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Topbar;