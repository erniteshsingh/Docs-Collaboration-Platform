import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./UpdatePassword.css";

const UpdatePassword = () => {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await axios.put(
        "http://localhost:5000/api/v1/users/update-password",
        {
          currentPassword,
          newPassword,
        },
        {
          withCredentials: true,
        },
      );

      toast.success(res.data.message);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      navigate("/profile");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-password-page">
      <div className="update-password-card">
        <h2>Update Password</h2>

        <p className="password-subtitle">
          Keep your account secure by updating your password regularly.
        </p>

        <form onSubmit={handleUpdatePassword}>
          <div className="password-input-group">
            <label>Current Password</label>

            <input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className="password-input-group">
            <label>New Password</label>

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="password-input-group">
            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="update-password-btn"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
