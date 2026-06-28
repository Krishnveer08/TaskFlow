import Sidebar from "../layouts/Sidebar";
import Topbar from "../layouts/Topbar";
import { useState } from "react";
import ProfileModal from "../components/settings/ProfileModal";
import ChangePasswordModal from "../components/settings/ChangePasswordModal";
import { clearAllTasks } from "../services/api";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

function Settings() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const { theme, toggleTheme, colors } = useTheme();
  const handleClearTasks = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete all your tasks? This action cannot be undone."
  );

  if (!confirmDelete) return;

  try {
    await clearAllTasks();

    toast.success("All tasks deleted successfully!");

    // Refresh the page
    window.location.reload();

  } catch (error) {
    console.error(error);
    toast.error("Failed to delete tasks");
  }
};
  return (
    <div className={`flex min-h-screen ${colors.page}`}>

      <Sidebar />

      <div className="flex-1 p-8">

        <Topbar />

        <div className="mt-8">

          <h1 className="text-4xl font-bold text-cyan-400">
            Settings
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your account preferences.
          </p>

          <div className="mt-8 grid gap-6">

           <div
  onClick={() => setOpenProfile(true)}
  className="bg-slate-800 rounded-2xl p-6 cursor-pointer hover:bg-slate-700 transition"
>
              <h2 className="text-2xl font-semibold">
                👤 Profile
              </h2>

              <p className="text-gray-400 mt-2">
                View your profile information.
              </p>
            </div>

            <div
  onClick={() => setOpenChangePassword(true)}
  className="bg-slate-800 rounded-2xl p-6 cursor-pointer hover:bg-slate-700 transition"
>
              <h2 className="text-2xl font-semibold">
                🔒 Change Password
              </h2>

              <p className="text-gray-400 mt-2">
                Update your account password.
              </p>
            </div>

            <div
  onClick={toggleTheme}
  className={`${colors.card} ${colors.cardHover} rounded-2xl p-6 cursor-pointer transition`}
>
  <h2 className="text-2xl font-semibold">
    {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
  </h2>

  <p className={`${colors.subText} mt-2`}>
    Click to switch to {theme === "dark" ? "Light" : "Dark"} mode.
  </p>
</div>

          <div
  onClick={handleClearTasks}
  className="bg-slate-800 rounded-2xl p-6 cursor-pointer hover:bg-red-700 transition"
>
  <h2 className="text-2xl font-semibold">
    🗑 Clear All Tasks
  </h2>

  <p className="text-gray-400 mt-2">
    Delete all your tasks permanently.
  </p>
</div>

          </div>

        </div>

      </div>
      <ProfileModal
  isOpen={openProfile}
  onClose={() => setOpenProfile(false)}
/>

      <ChangePasswordModal
        isOpen={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
      />

    </div>
  );
}

export default Settings;