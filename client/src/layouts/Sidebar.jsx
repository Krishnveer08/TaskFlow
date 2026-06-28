import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
function Sidebar() {
  const location = useLocation();
  const { colors } = useTheme();
  const menu = [
    {
      name: "Dashboard",
      icon: "🏠",
      path: "/dashboard",
    },
    {
      name: "Tasks",
      icon: "📝",
      path: "/dashboard",
    },
    {
      name: "AI Assistant",
      icon: "🤖",
      path: "/ai",
    },
    {
      name: "Settings",
      icon: "⚙",
      path: "/settings",
    },
  ];

  return (
    <div className={`w-64 min-h-screen p-6 ${colors.card}`}>

      <h1 className="text-3xl font-bold text-cyan-400 mb-10">
        TaskFlow
      </h1>

      <div className="flex flex-col gap-3">

        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
           className={`rounded-lg p-3 transition ${
  location.pathname === item.path
    ? "bg-cyan-600 text-white"
    : `${colors.cardHover} ${colors.text}`
}`}
          >
            {item.icon} {item.name}
          </Link>
        ))}

      </div>

    </div>
  );
}

export default Sidebar;