import { useState } from "react";
import toast from "react-hot-toast";
import { changePassword } from "../../services/userService";

function ChangePasswordModal({ isOpen, onClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      await changePassword({
        currentPassword,
        newPassword,
      });

      toast.success("Password updated successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Unable to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-cyan-400 mb-6">
          🔒 Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full bg-slate-700 p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full bg-slate-700 p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-slate-700 p-3 rounded-lg"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="bg-cyan-500 px-5 py-2 rounded-lg"
            >
              {loading ? "Updating..." : "Update"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default ChangePasswordModal;