import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getProfile,
  updateProfile,
} from "../../services/userService";

function ProfileModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isOpen) {
      loadProfile();
    }
  }, [isOpen]);

  const loadProfile = async () => {
    try {
      const user = await getProfile();

      setName(user.name);
      setEmail(user.email);
    } catch (err) {
      console.log(err);
      toast.error("Unable to load profile");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateProfile({
        name,
        email,
      });

      toast.success("Profile Updated Successfully");

      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Unable to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-cyan-400 mb-6">
          👤 Profile
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-700 p-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              {loading ? "Saving..." : "Save"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ProfileModal;